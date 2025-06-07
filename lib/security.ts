// Security configuration and utilities
import crypto from 'crypto'

// Environment variable validation
function requireEnvVar(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

// Security configuration with fallbacks for development
export const SecurityConfig = {
  // Admin Authentication
  adminPassword: process.env.ADMIN_PASSWORD || (() => {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ADMIN_PASSWORD must be set in production')
    }
    console.warn('⚠️  Using default password in development. Set ADMIN_PASSWORD in .env.local')
    return 'temp_dev_password_' + Date.now()
  })(),
  
  sessionSecret: process.env.ADMIN_SESSION_SECRET || (() => {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ADMIN_SESSION_SECRET must be set in production')
    }
    return crypto.randomBytes(32).toString('base64')
  })(),
  
  cookieName: process.env.ADMIN_COOKIE_NAME || 'cms_admin_session',
  sessionDuration: parseInt(process.env.ADMIN_SESSION_DURATION || '604800'), // 7 days default
  
  // Rate Limiting
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '10'),
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '60000'), // 1 minute
  
  // Content Security
  contentMaxSize: parseInt(process.env.CONTENT_MAX_SIZE || '1048576'), // 1MB default
  backupEnabled: process.env.CONTENT_BACKUP_ENABLED === 'true',
  
  // Development
  isDevelopment: process.env.NODE_ENV !== 'production',
  enableApiLogs: process.env.ENABLE_API_LOGS === 'true'
}

// Session token generation
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('base64url')
}

// Password hashing utilities
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16)
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err)
      resolve(salt.toString('hex') + ':' + derivedKey.toString('hex'))
    })
  })
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [salt, key] = hash.split(':')
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, Buffer.from(salt, 'hex'), 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err)
      resolve(key === derivedKey.toString('hex'))
    })
  })
}

// Secure cookie configuration
export function getSecureCookieConfig() {
  return {
    name: SecurityConfig.cookieName,
    httpOnly: true,
    secure: !SecurityConfig.isDevelopment,
    sameSite: 'strict' as const,
    maxAge: SecurityConfig.sessionDuration,
    path: '/'
  }
}

// Content validation
export function validateContentSize(content: string): boolean {
  return Buffer.byteLength(content, 'utf8') <= SecurityConfig.contentMaxSize
}

// Rate limiting store (in-memory for simplicity)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(identifier: string): { allowed: boolean; resetTime: number } {
  const now = Date.now()
  const windowStart = now - SecurityConfig.rateLimitWindow
  
  // Clean old entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < windowStart) {
      rateLimitStore.delete(key)
    }
  }
  
  const current = rateLimitStore.get(identifier)
  if (!current) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + SecurityConfig.rateLimitWindow })
    return { allowed: true, resetTime: now + SecurityConfig.rateLimitWindow }
  }
  
  if (current.count >= SecurityConfig.rateLimitMax) {
    return { allowed: false, resetTime: current.resetTime }
  }
  
  current.count++
  return { allowed: true, resetTime: current.resetTime }
}

// Security headers
export function getSecurityHeaders() {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  }
}

// Session validation (to be used across APIs)
const activeSessions = new Map<string, { createdAt: number; lastActive: number }>()

export function validateSession(sessionToken: string): boolean {
  const session = activeSessions.get(sessionToken)
  if (!session) return false
  
  const now = Date.now()
  const maxAge = SecurityConfig.sessionDuration * 1000
  
  if (now - session.createdAt > maxAge) {
    activeSessions.delete(sessionToken)
    return false
  }
  
  // Update last active time
  session.lastActive = now
  return true
}

export function createSession(sessionToken: string): void {
  const now = Date.now()
  activeSessions.set(sessionToken, {
    createdAt: now,
    lastActive: now
  })
}

export function deleteSession(sessionToken: string): void {
  activeSessions.delete(sessionToken)
}

export function cleanupExpiredSessions(): void {
  const now = Date.now()
  const maxAge = SecurityConfig.sessionDuration * 1000
  
  for (const [token, session] of activeSessions.entries()) {
    if (now - session.createdAt > maxAge) {
      activeSessions.delete(token)
    }
  }
}
