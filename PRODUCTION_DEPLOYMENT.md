# Production Deployment Checklist

## Pre-Deployment Security Setup

### ✅ Environment Variables
- [ ] `ADMIN_PASSWORD` - Set to strong, unique password (32+ characters)
- [ ] `ADMIN_SESSION_SECRET` - Set to cryptographically secure secret (32 bytes, base64)
- [ ] `NODE_ENV=production` - Enables production security mode
- [ ] `ADMIN_COOKIE_NAME` - Custom cookie name (optional)
- [ ] `ADMIN_SESSION_DURATION` - Session timeout in seconds (default: 604800 = 7 days)

### ✅ Optional Security Configuration
- [ ] `RATE_LIMIT_MAX` - Max requests per window (default: 10)
- [ ] `RATE_LIMIT_WINDOW` - Rate limit window in ms (default: 60000 = 1 minute)
- [ ] `CONTENT_MAX_SIZE` - Max content size in bytes (default: 1048576 = 1MB)
- [ ] `CONTENT_BACKUP_ENABLED=true` - Enable content backups
- [ ] `ENABLE_API_LOGS=true` - Enable security logging

### ✅ Infrastructure Security
- [ ] SSL/TLS certificate configured
- [ ] Reverse proxy configured to pass client IP headers
- [ ] Firewall rules configured
- [ ] Database/session storage configured (if scaling beyond single server)

## Deployment Commands

### Environment Setup
```bash
# Generate secure passwords
openssl rand -base64 32  # For ADMIN_PASSWORD
openssl rand -base64 32  # For ADMIN_SESSION_SECRET

# Example production .env
echo "NODE_ENV=production" > .env.production
echo "ADMIN_PASSWORD=$(openssl rand -base64 32)" >> .env.production
echo "ADMIN_SESSION_SECRET=$(openssl rand -base64 32)" >> .env.production
echo "CONTENT_BACKUP_ENABLED=true" >> .env.production
echo "ENABLE_API_LOGS=true" >> .env.production
```

### Build and Deploy
```bash
# Install dependencies
npm ci --only=production

# Build the application
npm run build

# Start production server
npm start
```

## Post-Deployment Verification

### ✅ Security Tests
- [ ] Authentication endpoint responds correctly
- [ ] Rate limiting is active (test with multiple failed logins)
- [ ] Security headers are present in responses
- [ ] Content endpoint requires authentication
- [ ] Sessions expire properly
- [ ] HTTPS enforced (secure cookies work)

### ✅ Functional Tests
- [ ] Admin login works with new password
- [ ] Content can be updated through admin interface
- [ ] Content backups are created (if enabled)
- [ ] Session persists across browser refresh
- [ ] Logout clears session properly

### ✅ Monitoring Setup
- [ ] Log monitoring configured
- [ ] Failed login attempt alerts
- [ ] Error rate monitoring
- [ ] Performance monitoring

## Security Monitoring Commands

### Check Logs
```bash
# Monitor authentication attempts
grep "Admin login" logs/application.log

# Monitor failed attempts
grep "Failed admin login" logs/application.log

# Monitor rate limiting
grep "Too many attempts" logs/application.log
```

### Test Security Endpoints
```bash
# Test rate limiting
for i in {1..15}; do
  curl -X POST http://localhost:3000/api/admin/auth \
    -H "Content-Type: application/json" \
    -d '{"action":"login","password":"wrong"}' &
done

# Test security headers
curl -I http://localhost:3000/api/content

# Test authentication requirement
curl -X POST http://localhost:3000/api/content \
  -H "Content-Type: application/json" \
  -d '{"test":"data"}'
```

## Rollback Plan

### If Issues Occur
1. **Authentication Problems**
   - Check environment variables are set
   - Verify password generation
   - Check server logs for errors

2. **Rate Limiting Too Aggressive**
   - Increase `RATE_LIMIT_MAX`
   - Increase `RATE_LIMIT_WINDOW`
   - Restart application

3. **Session Issues**
   - Check `ADMIN_SESSION_SECRET` is set
   - Verify cookie configuration
   - Check HTTPS/SSL setup

4. **Complete Rollback**
   - Keep backup of `route_old.ts` files
   - Can temporarily revert to old authentication
   - Address security issues before re-deployment

## Maintenance Tasks

### Regular Maintenance
- [ ] Rotate `ADMIN_PASSWORD` every 90 days
- [ ] Rotate `ADMIN_SESSION_SECRET` every 90 days
- [ ] Review and clean up old content backups
- [ ] Monitor authentication logs for suspicious activity
- [ ] Update dependencies regularly

### Security Reviews
- [ ] Monthly log review for failed authentication attempts
- [ ] Quarterly security configuration review
- [ ] Semi-annual penetration testing
- [ ] Annual security audit

## Emergency Contacts

- **Security Issues**: [Your security team contact]
- **Infrastructure**: [Your infrastructure team contact]
- **On-Call**: [Your on-call contact]

## Documentation Links

- [Security Guide](./SECURITY_GUIDE.md) - Complete security documentation
- [Environment Variables](./.env.example) - Environment variable template
- [API Documentation](./README.md) - API usage documentation

---

**Last Updated**: June 7, 2025
**Reviewed By**: Security Team
**Next Review**: September 7, 2025
