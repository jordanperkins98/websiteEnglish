# Security Implementation Guide

## Overview

This content management system has been secured with comprehensive security measures including environment-based authentication, rate limiting, session management, and security headers.

## Security Features Implemented

### 1. Environment-Based Configuration
- **Hardcoded passwords removed**: All authentication credentials are now environment-based
- **Environment validation**: Production environments require all security variables
- **Development fallbacks**: Safe defaults for development with clear warnings

### 2. Authentication Security
- **Secure session tokens**: Cryptographically strong session tokens using `crypto.randomBytes`
- **Session management**: Centralized session validation with automatic expiration
- **Secure cookies**: HttpOnly, Secure, SameSite cookies with configurable duration
- **Authentication logging**: Optional login attempt logging for security monitoring

### 3. Rate Limiting
- **IP-based rate limiting**: Prevents brute force attacks on authentication endpoints
- **Configurable limits**: Customizable rate limits per endpoint
- **Automatic cleanup**: Expired rate limit entries are automatically cleaned up

### 4. Content Security
- **Content size validation**: Prevents oversized content uploads
- **Backup system**: Optional automatic backups before content updates
- **Input validation**: Proper JSON validation and error handling

### 5. Security Headers
- **XSS Protection**: `X-XSS-Protection` header
- **Content Type**: `X-Content-Type-Options: nosniff`
- **Frame Options**: `X-Frame-Options: DENY`
- **Referrer Policy**: Strict referrer policy
- **Permissions Policy**: Restrictive permissions for sensitive APIs

## Environment Variables

### Required for Production
```env
ADMIN_PASSWORD=your_secure_password_here
ADMIN_SESSION_SECRET=your_32_byte_base64_secret
```

### Optional Configuration
```env
ADMIN_COOKIE_NAME=cms_admin_session
ADMIN_SESSION_DURATION=604800
RATE_LIMIT_MAX=10
RATE_LIMIT_WINDOW=60000
CONTENT_MAX_SIZE=1048576
CONTENT_BACKUP_ENABLED=true
ENABLE_API_LOGS=false
```

## Setup Instructions

### 1. Environment Configuration
1. Copy `.env.example` to `.env.local` for development
2. Copy `.env.example` to `.env.production` for production
3. Generate secure passwords and secrets:
   ```bash
   # Generate a secure admin password
   openssl rand -base64 32
   
   # Generate a session secret
   openssl rand -base64 32
   ```

### 2. Production Deployment
1. Set all required environment variables in your hosting platform
2. Ensure `NODE_ENV=production` is set
3. Configure SSL/TLS termination for secure cookies
4. Set up proper reverse proxy headers for IP detection

### 3. Security Monitoring
- Enable API logs in production: `ENABLE_API_LOGS=true`
- Monitor failed login attempts in application logs
- Set up alerts for unusual authentication patterns

## API Security Details

### Authentication Endpoint (`/api/admin/auth`)
- **Rate Limited**: Max 10 attempts per IP per minute (configurable)
- **Session Management**: Secure token-based sessions
- **Automatic Cleanup**: Expired sessions are cleaned up hourly
- **Security Headers**: Applied to all responses

### Content Endpoint (`/api/content`)
- **Authentication Required**: All modifications require valid session
- **Rate Limited**: Separate rate limiting for content operations
- **Content Validation**: Size and format validation
- **Backup System**: Optional content backups before updates

## Security Best Practices

### Development
1. Never commit `.env` files to version control
2. Use the provided `.env.example` as a template
3. Regularly rotate development passwords
4. Enable API logging for debugging

### Production
1. Use strong, unique passwords (minimum 32 characters)
2. Enable content backups: `CONTENT_BACKUP_ENABLED=true`
3. Monitor authentication logs regularly
4. Set up proper SSL/TLS termination
5. Configure reverse proxy to pass client IP headers
6. Regularly update dependencies

### Session Management
- Sessions automatically expire after configured duration (default: 7 days)
- Session tokens are cryptographically secure (32 bytes)
- Sessions are cleaned up automatically to prevent memory leaks
- Invalid sessions are immediately cleaned up

## Rate Limiting Configuration

### Default Limits
- **Authentication**: 10 attempts per IP per minute
- **Content Updates**: 10 requests per IP per minute

### Customization
```env
# Increase rate limits for high-traffic sites
RATE_LIMIT_MAX=50
RATE_LIMIT_WINDOW=60000  # 1 minute in milliseconds
```

## Troubleshooting

### Common Issues

1. **"Missing required environment variable" errors**
   - Ensure all required variables are set in production
   - Check `.env.local` file exists in development

2. **Rate limiting triggering unexpectedly**
   - Check if behind a proxy that's not passing client IPs
   - Adjust rate limits in environment variables

3. **Sessions expiring too quickly**
   - Increase `ADMIN_SESSION_DURATION` (in seconds)
   - Check system clock synchronization

4. **Authentication failing after deployment**
   - Verify environment variables are set correctly
   - Check SSL/TLS configuration for secure cookies

### Logs and Monitoring
Enable API logs to troubleshoot issues:
```env
ENABLE_API_LOGS=true
```

This will log:
- Successful admin logins with IP addresses
- Failed login attempts with IP addresses
- Unauthorized content access attempts
- Content updates with IP addresses
- Content backup creation

## Migration from Old System

The security upgrade maintains backward compatibility while adding new security features:

1. **Cookie Names**: Now configurable via `ADMIN_COOKIE_NAME`
2. **Session Values**: Changed from simple "authenticated" string to secure tokens
3. **Password Storage**: Moved from hardcoded to environment variables
4. **Rate Limiting**: New feature, may affect high-frequency automation

### Migration Checklist
- [ ] Set up environment variables
- [ ] Test authentication flow
- [ ] Verify rate limits don't affect normal usage
- [ ] Enable content backups if desired
- [ ] Configure monitoring and logging
- [ ] Update any automation to handle rate limits

## Security Considerations

### Known Limitations
1. **In-Memory Sessions**: Sessions are stored in memory and will be lost on server restart
   - For production, consider using Redis or database for session storage
2. **Rate Limiting Storage**: Rate limits are stored in memory
   - For multi-server deployments, consider shared storage
3. **Backup Storage**: Content backups are stored locally
   - Consider external backup storage for production

### Future Enhancements
1. **Database Session Storage**: For scalability and persistence
2. **Multi-Factor Authentication**: Additional security layer
3. **API Key Authentication**: For programmatic access
4. **Audit Logging**: Comprehensive security event logging
5. **IP Whitelisting**: Additional access control options

## Support

For security-related issues or questions:
1. Check this documentation first
2. Review application logs with `ENABLE_API_LOGS=true`
3. Test in development environment before production changes
4. Follow security best practices for any modifications
