import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'
import { 
  SecurityConfig, 
  validateContentSize, 
  getSecurityHeaders, 
  checkRateLimit,
  validateSession 
} from '@/lib/security'

const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'content.json')

// Helper function to validate admin authentication
async function validateAdminAuth(): Promise<{ isValid: boolean; error?: string }> {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get(SecurityConfig.cookieName)
    
    if (!authCookie || !authCookie.value) {
      return { isValid: false, error: 'No authentication token' }
    }

    const isValidSession = validateSession(authCookie.value)
    if (!isValidSession) {
      return { isValid: false, error: 'Invalid or expired session' }
    }

    return { isValid: true }
  } catch (error) {
    console.error('Auth validation error:', error)
    return { isValid: false, error: 'Authentication validation failed' }
  }
}

export async function GET() {
  try {
    // Check if the content file exists
    if (!fs.existsSync(CONTENT_FILE_PATH)) {
      return NextResponse.json(
        { error: 'Content file not found' },
        { 
          status: 404,
          headers: getSecurityHeaders()
        }
      )
    }

    // Read and parse the content file
    const fileContent = fs.readFileSync(CONTENT_FILE_PATH, 'utf8')
    const content = JSON.parse(fileContent)

    return NextResponse.json(content, {
      headers: getSecurityHeaders()
    })
  } catch (error) {
    console.error('Error reading content:', error)
    return NextResponse.json(
      { error: 'Failed to read content' },
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    )
  }
}

export async function POST(request: NextRequest) {
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown'
  
  try {
    // Rate limiting check
    const rateLimit = checkRateLimit(`content-${clientIP}`)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          resetTime: rateLimit.resetTime 
        },
        { 
          status: 429,
          headers: {
            ...getSecurityHeaders(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
          }
        }
      )
    }

    // Check admin authentication
    const authValidation = await validateAdminAuth()
    if (!authValidation.isValid) {
      if (SecurityConfig.enableApiLogs) {
        console.log(`Unauthorized content update attempt from IP: ${clientIP}`)
      }
      
      return NextResponse.json(
        { error: 'Unauthorized' },
        { 
          status: 401,
          headers: getSecurityHeaders()
        }
      )
    }

    const content = await request.json()
    const contentString = JSON.stringify(content, null, 2)

    // Validate content size
    if (!validateContentSize(contentString)) {
      return NextResponse.json(
        { error: `Content too large. Maximum size: ${SecurityConfig.contentMaxSize} bytes` },
        { 
          status: 413,
          headers: getSecurityHeaders()
        }
      )
    }

    // Create backup if enabled
    if (SecurityConfig.backupEnabled && fs.existsSync(CONTENT_FILE_PATH)) {
      const backupPath = `${CONTENT_FILE_PATH}.backup.${Date.now()}`
      fs.copyFileSync(CONTENT_FILE_PATH, backupPath)
      
      if (SecurityConfig.enableApiLogs) {
        console.log(`Content backup created: ${backupPath}`)
      }
    }

    // Ensure the data directory exists
    const dataDir = path.dirname(CONTENT_FILE_PATH)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Write the content to the file
    fs.writeFileSync(CONTENT_FILE_PATH, contentString, 'utf8')

    if (SecurityConfig.enableApiLogs) {
      console.log(`Content updated successfully by IP: ${clientIP}`)
    }

    return NextResponse.json(
      { success: true },
      { headers: getSecurityHeaders() }
    )
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json(
      { error: 'Failed to save content' },
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    )
  }
}
