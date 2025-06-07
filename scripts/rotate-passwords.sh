#!/bin/bash
# Script to rotate admin passwords for Word & Wonder CMS
# Usage: ./scripts/rotate-passwords.sh

echo "🔄 Rotating admin credentials..."

# Generate new secure values
NEW_ADMIN_PASSWORD=$(openssl rand -base64 32)
NEW_SESSION_SECRET=$(openssl rand -base64 32)
NEW_NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEW_COOKIE_SUFFIX=$(date +%s | sha256sum | head -c 8)

echo "✅ Generated new credentials:"
echo "ADMIN_PASSWORD: $NEW_ADMIN_PASSWORD"
echo "ADMIN_SESSION_SECRET: $NEW_SESSION_SECRET"
echo "NEXTAUTH_SECRET: $NEW_NEXTAUTH_SECRET"
echo "COOKIE_NAME: ww_cms_session_$NEW_COOKIE_SUFFIX"

# Ask for confirmation
read -p "❓ Update .env.local with these new values? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Backup current .env.local
    cp .env.local .env.local.backup.$(date +%Y%m%d_%H%M%S)
    
    # Update .env.local
    sed -i.tmp "s/^ADMIN_PASSWORD=.*/ADMIN_PASSWORD=$NEW_ADMIN_PASSWORD/" .env.local
    sed -i.tmp "s/^ADMIN_SESSION_SECRET=.*/ADMIN_SESSION_SECRET=$NEW_SESSION_SECRET/" .env.local
    sed -i.tmp "s/^NEXTAUTH_SECRET=.*/NEXTAUTH_SECRET=$NEW_NEXTAUTH_SECRET/" .env.local
    sed -i.tmp "s/^ADMIN_COOKIE_NAME=.*/ADMIN_COOKIE_NAME=ww_cms_session_$NEW_COOKIE_SUFFIX/" .env.local
    
    # Clean up temp file
    rm .env.local.tmp
    
    echo "✅ Credentials updated in .env.local"
    echo "📁 Backup saved as .env.local.backup.$(date +%Y%m%d_%H%M%S)"
    echo "🔄 Restart your development server to apply changes"
else
    echo "❌ Update cancelled"
fi
