# Deployment Guide: GitHub → Cloudflare Pages

This guide walks you through deploying the Rent ATV Santa Teresa website to Cloudflare Pages with GitHub as the source of truth.

## Prerequisites

- GitHub account (https://github.com)
- Cloudflare account (https://dash.cloudflare.com)
- Node.js and npm installed locally
- Git installed locally

## Step 1: Create the GitHub Repository

1. Go to https://github.com/new
2. Create a new repository:
   - **Repository name**: `rentatv-santa-teresa`
   - **Description**: "ATV rental website for Santa Teresa, Costa Rica"
   - **Visibility**: Public
   - **Do NOT** initialize with README, .gitignore, or license
3. Click **Create repository**
4. You'll see a blank repo page with setup instructions — copy the HTTPS URL

## Step 2: Initial GitHub Push

1. **On your local machine**, navigate to the project folder:
   ```bash
   cd path/to/rentatv
   ```

2. **Run the deploy script** (first time only):
   ```bash
   bash deploy-to-github.sh
   ```

   This script will:
   - Initialize git (if needed)
   - Add GitHub as the remote
   - Commit all files
   - Push to the `main` branch

3. **Enter your GitHub credentials** when prompted (or use SSH if configured)

4. **Verify the push**: Go to https://github.com/eddyrank/rentatv-santa-teresa and confirm all files are there

## Step 3: Connect Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. In the left sidebar, select **Pages**
3. Click **Connect to Git**
4. Select **GitHub** and authorize Cloudflare to access your repositories
5. Search for and select `rentatv-santa-teresa`
6. Configure build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**: (leave blank for now)
7. Click **Save and Deploy**

Cloudflare Pages will:
- Clone your repo
- Run `npm install && npm run build`
- Deploy the `dist` folder
- Assign a preview URL: `https://rentatv-santa-teresa.pages.dev`

## Step 4: Future Deployments

Every time you want to update the website:

1. **Make changes** locally (or ask Claude to make them)
2. **Push to GitHub**:
   ```bash
   bash deploy-to-github.sh
   ```
3. **Cloudflare Pages auto-deploys** within 1–2 minutes

You can monitor deployments at: https://dash.cloudflare.com → Pages → rentatv-santa-teresa

## Pushing Changes via Claude Chat

To make updates and push via Claude:

1. Ask Claude to make the changes you want
2. Claude will update the files and commit
3. I'll push to GitHub using the deploy script
4. Cloudflare Pages detects the push and auto-deploys

Example:
> "Update the pricing to $70/day and add a new testimonial to the homepage"

Claude will:
- Edit `src/pages/pricing.astro`
- Edit the homepage
- Commit with a message
- Push to GitHub
- Cloudflare Pages auto-builds and deploys

## Connecting a Custom Domain Later

When you're ready to use a custom domain (e.g., `rentatv.com`):

1. Purchase the domain from a registrar (Namecheap, GoDaddy, etc.)
2. In Cloudflare Pages, go to **Settings** → **Custom domains**
3. Add your domain
4. Update your registrar's nameservers to point to Cloudflare (instructions provided)
5. Your site will be live at your custom domain

## Rollback (if something breaks)

If a deploy goes wrong:

1. Go to https://dash.cloudflare.com → Pages → rentatv-santa-teresa
2. Click **Deployments**
3. Find the last good deployment
4. Click **Rollback** to revert instantly

## Troubleshooting

**Build fails on Cloudflare but works locally?**
- Check that `npm run build` works: `npm run build`
- Ensure `dist/` folder is generated
- Check Cloudflare's build logs for specific errors

**Changes not appearing?**
- Verify the push succeeded: `git log` should show your commit
- Wait 1–2 minutes for Cloudflare to detect and rebuild
- Hard-refresh your browser (Cmd/Ctrl + Shift + R)
- Check Cloudflare deployment status

**Authentication issues with GitHub?**
- Use SSH keys instead of HTTPS (faster, no credentials)
- Or generate a GitHub personal access token and use it as password

## Next Steps

1. ✅ Run the deploy script for the first time
2. ✅ Connect Cloudflare Pages
3. ✅ Share the preview URL: https://rentatv-santa-teresa.pages.dev
4. 📸 Add real photos to `/public` folder
5. ✏️ Update pricing, hours, phone, email in `src/data/site.ts`
6. 🎯 Later: Connect your custom domain

---

**Questions?** Ask Claude to help with any of these steps.
