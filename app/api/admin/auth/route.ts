// filepath: /Users/jordanperkins/repos/websiteEnglish/app/api/admin/auth/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { 
  SecurityConfig, 
  generateSessionToken, 
  getSecureCookieConfig, 
  checkRateLimit, 
  getSecurityHeaders,
  createSession,
  deleteSession,
  validateSession,
  cleanupExpiredSessions
} from '@/lib/security'

// Static export configuration
export const dynamic = 'force-static'
export const revalidate = false

export async function POST(request: NextRequest) {
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown'
  
  try {
    // Rate limiting check
    const rateLimit = checkRateLimit(clientIP)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many attempts. Please try again later.',
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

    const { password, action } = await request.json()

    if (action === 'login') {
      if (password === SecurityConfig.adminPassword) {
        // Generate secure session token
        const sessionToken = generateSessionToken()
        
        // Store session
        createSession(sessionToken)

        // Set secure authentication cookie
        const cookieStore = await cookies()
        const cookieConfig = getSecureCookieConfig()
        cookieStore.set({
          ...cookieConfig,
          value: sessionToken
        })

        if (SecurityConfig.enableApiLogs) {
          console.log(`Admin login successful from IP: ${clientIP}`)
        }

        return NextResponse.json(
          { success: true, authenticated: true },
          { headers: getSecurityHeaders() }
        )
      } else {
        if (SecurityConfig.enableApiLogs) {
          console.log(`Failed admin login attempt from IP: ${clientIP}`)
        }
        
        return NextResponse.json(
          { success: false, error: 'Invalid password' },
          { 
            status: 401,
            headers: getSecurityHeaders()
          }
        )
      }
    } else if (action === 'logout') {
      // Clear authentication cookie and session
      const cookieStore = await cookies()
      const authCookie = cookieStore.get(SecurityConfig.cookieName)
      
      if (authCookie?.value) {
        deleteSession(authCookie.value)
      }
      
      cookieStore.delete(SecurityConfig.cookieName)

      return NextResponse.json(
        { success: true, authenticated: false },
        { headers: getSecurityHeaders() }
      )
    } else if (action === 'check') {
      // Check if user is authenticated
      const cookieStore = await cookies()
      const authCookie = cookieStore.get(SecurityConfig.cookieName)
      
      if (!authCookie?.value) {
        return NextResponse.json(
          { success: true, authenticated: false },
          { headers: getSecurityHeaders() }
        )
      }

      const isValid = validateSession(authCookie.value)
      
      if (!isValid) {
        // Session expired or invalid
        cookieStore.delete(SecurityConfig.cookieName)
        
        return NextResponse.json(
          { success: true, authenticated: false },
          { headers: getSecurityHeaders() }
        )
      }

      return NextResponse.json(
        { success: true, authenticated: true },
        { headers: getSecurityHeaders() }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { 
        status: 400,
        headers: getSecurityHeaders()
      }
    )
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    )
  }
}

// Run cleanup every hour
setInterval(cleanupExpiredSessions, 60 * 60 * 1000)
