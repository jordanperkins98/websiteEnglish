# 🔐 Admin Password Recovery Guide

## Current Admin Credentials
- **Website**: Word & Wonder English Tutoring
- **Admin Panel**: http://localhost:3000/admin (development) 
- **Username**: admin (no username required, just password)

## 🆘 Emergency Password Recovery

### Method 1: Check Environment File
Your current password is stored in `.env.local`:
```bash
# Open the file to see your password
cat .env.local | grep ADMIN_PASSWORD
```

### Method 2: Reset Password Script
Run the password reset script:
```bash
chmod +x scripts/reset-admin-password.sh
./scripts/reset-admin-password.sh
```

### Method 3: Manual Reset
1. Open `.env.local` file in VS Code
2. Find the line `ADMIN_PASSWORD=your_current_password`
3. Change it to: `ADMIN_PASSWORD=your_new_password`
4. Save the file
5. Restart your development server

## 📝 Password Change History
- Initial setup: `WordAndWonder2024!`
- Date changed: June 7, 2025
- Changed by: Jordan

## 🔒 Security Notes
- Only Jordan and sister should know this password
- Change password every 6 months
- Keep this file secure and private
- Don't commit this file to git (it's in .gitignore)

## 📞 Emergency Contact
If both forget the password:
1. Use Method 1 above to check .env.local
2. Use Method 2 to reset with script
3. Contact developer if needed
