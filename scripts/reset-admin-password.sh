#!/bin/bash

# 🔐 Admin Password Reset Script for Word & Wonder English Tutoring
# This script allows you to reset your admin password if you forget it

echo "🔐 Word & Wonder Admin Password Reset"
echo "======================================"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local file not found!"
    echo "Make sure you're running this from the project root directory."
    exit 1
fi

echo "Current admin password:"
grep "ADMIN_PASSWORD=" .env.local
echo ""

echo "Choose an option:"
echo "1) Show current password"
echo "2) Set new custom password" 
echo "3) Generate new secure password"
echo "4) Exit"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "Your current admin password is:"
        grep "ADMIN_PASSWORD=" .env.local | cut -d'=' -f2
        echo ""
        ;;
    2)
        echo ""
        read -p "Enter your new password: " new_password
        # Backup current .env.local
        cp .env.local .env.local.backup
        # Replace the password
        sed -i.bak "s/ADMIN_PASSWORD=.*/ADMIN_PASSWORD=$new_password/" .env.local
        echo "✅ Password updated successfully!"
        echo "Backup saved as .env.local.backup"
        echo "Your new password is: $new_password"
        echo ""
        echo "⚠️  Remember to restart your development server for changes to take effect:"
        echo "npm run dev"
        ;;
    3)
        echo ""
        new_secure_password=$(openssl rand -base64 16 | tr -d "=+/" | cut -c1-16)
        # Backup current .env.local
        cp .env.local .env.local.backup  
        # Replace the password
        sed -i.bak "s/ADMIN_PASSWORD=.*/ADMIN_PASSWORD=$new_secure_password/" .env.local
        echo "✅ New secure password generated and set!"
        echo "Backup saved as .env.local.backup"
        echo "Your new password is: $new_secure_password"
        echo ""
        echo "📝 Make sure to write this down and share with your sister!"
        echo ""
        echo "⚠️  Remember to restart your development server for changes to take effect:"
        echo "npm run dev"
        ;;
    4)
        echo "Goodbye! 👋"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "Password recovery complete! 🎉"
