# Deploying HOLYKIDS Biometric Attendance to Netlify

## Prerequisites

1. **GitHub Account** - For storing your code
2. **Netlify Account** - For hosting the app
3. **Supabase Account** - For database (optional but recommended)

## Step 1: Push Code to GitHub

1. Create a new repository on GitHub
2. Initialize git and push your code:

```bash
cd c:/Users/User/TIME\ ATTENDANCE
git init
git add .
git commit -m "Initial commit: HOLYKIDS Biometric Attendance System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Deploy from GitHub (Recommended)

1. Go to [Netlify](https://netlify.com) and sign up/login
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** and choose your repository
4. Netlify will auto-detect the settings from `netlify.toml`
5. Click **"Deploy site"**

### Option B: Deploy by Drag & Drop

1. Build your project:
   ```bash
   npm run build
   ```
2. The output will be in `.next/` folder
3. Go to Netlify → Drop your project folder

## Step 3: Configure Environment Variables

In Netlify Dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_NAME=HOLYKIDS Staff Attendance
NEXT_PUBLIC_ORGANIZATION_NAME=HOLYKIDS School
```

## Step 4: Set Up Supabase (Optional but Recommended)

### Create Supabase Project

1. Go to [Supabase](https://supabase.com) and create a free account
2. Click **"New project"** and fill in details
3. Wait for the project to be ready

### Run Database Setup

1. Go to **SQL Editor** in Supabase Dashboard
2. Copy and run the contents of `supabase/schema.sql`
3. This creates the `staff` table and other required tables

### Get API Keys

1. Go to **Settings** → **API**
2. Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 5: Test Your Deployment

1. Open your Netlify site URL
2. Go to **Admin** → **Staff Management**
3. Try adding a staff member
4. Verify the staff is saved

## Features Working

✅ **With Supabase configured:**
- Staff records saved to cloud database
- Data syncs across devices
- Full cloud backup

✅ **Without Supabase (fallback):**
- Staff saved to localStorage
- Works offline
- Data persists in browser

## Common Issues

### Issue: API routes not working
**Solution:** Make sure environment variables are set in Netlify

### Issue: Biometric not working on mobile
**Solution:** 
- Biometric requires HTTPS (Netlify provides this)
- Use Chrome or Safari browser
- On Android, use the Capacitor app for native fingerprint

### Issue: Styles not loading
**Solution:** Check that `_next/static` headers are configured (already in netlify.toml)

## Domain & SSL

- Netlify automatically provides SSL certificate
- Custom domain can be added in **Domain settings**

## Updating Your Site

Simply push changes to GitHub and Netlify will automatically redeploy:

```bash
git add .
git commit -m "Update description"
git push
```

## Next Steps

After successful deployment:

1. **Test all features** - Check-in, check-out, reports
2. **Add staff members** - Register all HOLYKIDS staff
3. **Setup biometric** - Enroll fingerprints for staff
4. **Share with staff** - Provide login credentials

## Support

- **Netlify Docs:** https://docs.netlify.com
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

**Created by Olushola Paul Odunuga**
