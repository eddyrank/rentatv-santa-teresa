#!/bin/bash
set -e

echo "🚀 Deploying to GitHub..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Run this script from the project root."
  exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "📝 Initializing git..."
  git init
  git config user.name "Rent ATV Santa Teresa"
  git config user.email "dev@rentatvsantateresa.com"
fi

# Add GitHub remote
GITHUB_URL="https://github.com/eddyrank/rentatv-santa-teresa.git"
echo "🔗 Adding GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "$GITHUB_URL"

# Check if we have changes
if [ -z "$(git status --porcelain)" ]; then
  echo "✅ Working tree is clean. Checking for unpushed commits..."
  UNPUSHED=$(git rev-list --count origin/main..main 2>/dev/null || echo "0")
  if [ "$UNPUSHED" -eq "0" ]; then
    echo "ℹ️  No changes to push. Everything is up to date."
    exit 0
  fi
else
  echo "📦 Staging changes..."
  git add -A
  
  echo "💾 Creating commit..."
  git commit -m "Update: ATV rental website with latest changes" || echo "No changes to commit"
fi

# Switch to main branch if on master
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" = "master" ]; then
  echo "🔄 Switching to main branch..."
  git branch -M main
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo -e "${GREEN}✅ Deployed to GitHub successfully!${NC}"
echo -e "${BLUE}Repository: $GITHUB_URL${NC}"
echo ""
echo "Next step: Connect to Cloudflare Pages"
echo "1. Go to https://dash.cloudflare.com"
echo "2. Select your account → Pages"
echo "3. Click 'Connect to Git'"
echo "4. Select 'GitHub' and authorize"
echo "5. Select repository: rentatv-santa-teresa"
echo "6. Build settings:"
echo "   - Framework: Astro"
echo "   - Build command: npm run build"
echo "   - Build output directory: dist"
echo "7. Deploy!"
echo ""
echo "After deployment, your site will be live at:"
echo "https://rentatv-santa-teresa.pages.dev"
