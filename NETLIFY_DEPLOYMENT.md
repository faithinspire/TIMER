# Deploying HOLYKIDS Biometric Attendance to Netlify

## ⚠️ CRITICAL: Environment Variables Required

Your app is NOT working on phone because Supabase environment variables are not set in Netlify!

**Current Status:** Staff are being saved to localStorage only (data won't persist across devices)

## Prerequisites

1. **GitHub Account** - For storing your code
2. **Netlify Account** - For hosting the app
3. **Supabase Account** - Already configured (project ID: mmluzuxcoqyrtenstkxq)

## Step 1: Configure Environment Variables in Netlify

### ⚠️ THIS IS THE MOST IMPORTANT STEP

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site (e.g., `time-attendance-xxx`)
3. Go to **Site settings** → **Environment variables**
4. Add these exact values:

| Variable | Value |
|----------|-------|
| NEXT_PUBLIC_SUPABASE_URL | `https://mmluzuxcoqyrtenstkxq.supabase.co` |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tbHV6dXhjb3F5cnRlbnN0a3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2Mjg3MTksImV4cCI6MjA4NTIwNDcxOX0.c8fGCzUxFNOW9s7Q-8JPwBEMsfQHflGex108fXXZpTc` |
| SUPABASE_SERVICE_ROLE_KEY | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tbHV6dXhjb3F5cnRlbnN0a3hxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTYyODcxOSwiZXhwIjoyMDg1MjA0NzE5fQ.QdOIYO18gIjfc6AGHxc-gXg0ShWbMT7fTJSsJ_sVtnk` |
| NEXT_PUBLIC_APP_NAME | `HOLYKIDS Staff Attendance` |
| NEXT_PUBLIC_ORGANIZATION_NAME | `HOLYKIDS School` |
| NEXT_PUBLIC_APP_URL | `https://YOUR-SITE-NAME.netlify.app` |
| NEXT_PUBLIC_REQUIRE_HTTPS | `true` |

5. Click **Save**
6. Go to **Deploys** → **Trigger deploy** → **Deploy site**

## Step 2: Verify Supabase Setup

1. Go to [Supabase Dashboard](https://app.netlify.com)
2. Select project: `mmluzuxcoqyrtenstkxq`
3. Go to **SQL Editor**
4. Run the schema from `supabase/schema.sql` if not already done

## Step 3: Test Your Deployment

1. Open your Netlify site URL
2. Go to `/test-connection`
3. You should see:
   - ✅ Supabase Connection: CONNECTED
   - ✅ Database Tables: OK

4. Go to **Admin** → **Staff Management**
5. Add a staff member
6. Verify it appears in Supabase Dashboard → **Table Editor** → **staff** table

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

### Issue: API routes not working / Staff not saving
**Solution:** 
- Make sure ALL environment variables are set in Netlify
- Check `/test-connection` page for status
- Trigger a new deploy after adding variables

### Issue: Phone can't access the site
**Solution:** 
- Ensure HTTPS is enabled (Netlify provides this)
- Check if site is deployed, not in draft mode
- Verify your Netlify site URL is correct

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

1. **Test all features** - Check `/test-connection` page first!
2. **Add staff members** - Register all HOLYKIDS staff
3. **Setup biometric** - Enroll fingerprints for staff
4. **Share with staff** - Provide login credentials

## Quick Checklist ✅

- [ ] Environment variables set in Netlify
- [ ] Triggered new deploy
- [ ] `/test-connection` shows "CONNECTED"
- [ ] Can add staff and see them in Supabase
- [ ] Phone can access the public URL

- **Netlify Docs:** https://docs.netlify.com
- **Supabase Docs:** https://supabase.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

**Created by Olushola Paul Odunuga**
