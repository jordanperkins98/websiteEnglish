#!/bin/bash

# 🚀 GitHub Pages Deployment Script for Word & Wonder English Tutoring
# This script creates a static build and deploys it to the gh-pages branch

echo "🌟 Word & Wonder - GitHub Pages Deployment"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Check if main branch is clean
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes in main branch."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled."
        exit 1
    fi
fi

echo "🔧 Building static site..."

# Use the static config for building
cp next.config.static.mjs next.config.mjs.backup
cp next.config.static.mjs next.config.mjs

# Build the static site
npm run build:static

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    # Restore original config
    mv next.config.mjs.backup next.config.mjs
    exit 1
fi

echo "✅ Build successful!"

# Restore original config
mv next.config.mjs.backup next.config.mjs

echo "📦 Preparing gh-pages branch..."

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "🔄 Switching to existing gh-pages branch..."
    git checkout gh-pages
    # Clear existing files (except .git)
    find . -maxdepth 1 -not -name '.git' -not -name '.' -not -name '..' -exec rm -rf {} +
else
    echo "🆕 Creating new gh-pages branch..."
    git checkout --orphan gh-pages
    # Remove all files from staging
    git rm -rf . 2>/dev/null || true
fi

# Copy build files to root
echo "📋 Copying build files..."
cp -r out/* .
cp out/.nojekyll . 2>/dev/null || true

# Create a simple README for the gh-pages branch
cat > README.md << 'EOF'
# Word & Wonder English Tutoring - GitHub Pages

This branch contains the static build of the Word & Wonder English Tutoring website.

🌐 **Live Site**: [Your GitHub Pages URL]
🔧 **Source Code**: See `main` branch
📅 **Last Updated**: $(date)

## About
This is the public-facing website for Word & Wonder English Tutoring. 
The admin/CMS functionality is available in the main branch for local development.
EOF

# Add and commit all files
git add .
git commit -m "Deploy static site - $(date +'%Y-%m-%d %H:%M:%S')"

echo "🚀 Pushing to GitHub..."
git push origin gh-pages

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your site will be available at:"
echo "   https://[your-username].github.io/[repository-name]"
echo ""
echo "⚙️  To enable GitHub Pages:"
echo "   1. Go to your GitHub repository"
echo "   2. Settings → Pages"
echo "   3. Source: Deploy from branch"
echo "   4. Branch: gh-pages"
echo "   5. Folder: / (root)"
echo ""

# Switch back to main branch
git checkout main

echo "🎉 All done! You're back on the main branch."
