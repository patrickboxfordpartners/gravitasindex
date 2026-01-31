# Deployment Guide - Gravitas Index

## Overview

This guide walks you through deploying Gravitas Index to production on Vercel with all services configured.

**Estimated Time**: 1-2 hours (with existing Supabase and Stripe accounts)

---

## Prerequisites

Before deploying, ensure you have:
- [ ] GitHub repository with latest code
- [ ] Supabase account (you have this)
- [ ] Stripe account (you have this)
- [ ] Vercel account (free tier works)
- [ ] Resend account (create new)
- [ ] Sanity account (create new)
- [ ] PostHog account (create new)
- [ ] Domain access (gravitasindex.com)

---

## Step 1: Deploy to Vercel

### 1.1 Connect GitHub Repository

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository: `patrickboxfordpartners/gravitasindex`
4. Click "Import"

### 1.2 Configure Project Settings

**Framework Preset**: Next.js (should auto-detect)

**Root Directory**: `./` (default)

**Build Command**: `npm run build` (default)

**Output Directory**: `.next` (default)

**Install Command**: `npm install` (default)

**Node Version**: 18.x or higher

### 1.3 Environment Variables

Click "Environment Variables" and add all variables from the list below.

**DON'T DEPLOY YET** - Add all environment variables first!

---

## Step 2: Configure Supabase

### 2.1 Create Project (if not already done)

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name: "Gravitas Index"
4. Database Password: (generate strong password, save it)
5. Region: Choose closest to your users
6. Click "Create new project"

Wait 2-3 minutes for provisioning.

### 2.2 Run Database Migration

1. In Supabase Dashboard, go to SQL Editor
2. Click "New Query"
3. Copy entire contents of `supabase/migrations/20260131_initial_schema.sql`
4. Paste into SQL editor
5. Click "Run"

**Verify**: Check Tables tab - should see 6 tables (leads, email_sequences, etc.)

### 2.3 Configure Auth

1. Go to Authentication → Providers
2. Enable "Email" provider
3. **Disable** "Confirm email"
4. **Enable** "Enable email OTP"
5. **Enable** "Secure email change"
6. Click "Save"

### 2.4 Configure Email Templates

1. Go to Authentication → Email Templates
2. Select "Magic Link"
3. Update subject: "Sign in to Gravitas Index Admin"
4. Update body:
```html
<h2>Sign in to Gravitas Index</h2>
<p>Click the link below to sign in to your admin dashboard:</p>
<p><a href="{{ .ConfirmationURL }}">Sign In</a></p>
<p>This link expires in 1 hour.</p>
<p>If you didn't request this, you can safely ignore this email.</p>
```
5. Click "Save"

### 2.5 Configure Redirect URLs

1. Go to Authentication → URL Configuration
2. Add these Site URLs:
   - `http://localhost:3000` (development)
   - `https://gravitasindex.com` (production)
3. Add these Redirect URLs:
   - `http://localhost:3000/admin/dashboard`
   - `https://gravitasindex.com/admin/dashboard`
4. Click "Save"

### 2.6 Get API Keys

1. Go to Project Settings → API
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (starts with eyJ)
   - **service_role key**: `eyJhbGc...` (starts with eyJ, different from anon)

**Add to Vercel Environment Variables**:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

### 2.7 Create Admin User

1. In Supabase Dashboard, go to Authentication → Users
2. Click "Add User" → "Create new user"
3. Enter your email address
4. Choose "Send Magic Link"
5. Check your email and click link to verify

---

## Step 3: Configure Resend

### 3.1 Create Account

1. Go to https://resend.com
2. Sign up for free account
3. Verify your email

### 3.2 Add Domain

1. In Resend Dashboard, go to Domains
2. Click "Add Domain"
3. Enter: `gravitasindex.com`
4. Click "Add"

### 3.3 Configure DNS Records

Resend will show you DNS records to add. Add these to your domain registrar:

**TXT Record** (SPF):
```
Name: @
Type: TXT
Value: v=spf1 include:_spf.resend.com ~all
```

**MX Records**:
```
Priority: 10
Value: feedback-smtp.us-east-1.amazonses.com
```

**CNAME Records** (DKIM - you'll get specific values):
```
Name: resend._domainkey
Type: CNAME
Value: [provided by Resend]
```

**DMARC Record** (optional but recommended):
```
Name: _dmarc
Type: TXT
Value: v=DMARC1; p=none; rua=mailto:dmarc@gravitasindex.com
```

### 3.4 Verify Domain

1. Wait 10-15 minutes for DNS propagation
2. In Resend Dashboard, click "Verify" next to your domain
3. Status should change to "Verified" (green checkmark)

If not verified:
- Check DNS records are correct
- Wait longer (can take up to 48 hours)
- Use `dig` or online DNS checker to verify propagation

### 3.5 Get API Key

1. In Resend Dashboard, go to API Keys
2. Click "Create API Key"
3. Name: "Gravitas Index Production"
4. Permission: "Sending access"
5. Click "Create"
6. **Copy the key immediately** (won't be shown again)

**Add to Vercel Environment Variables**:
```
RESEND_API_KEY=re_xxxxx
```

---

## Step 4: Configure Sanity CMS

### 4.1 Create Project

```bash
cd /Users/patrickmitchell/gravitasindex
npm create sanity@latest
```

Follow prompts:
- Login/Signup: Use your email
- Create new project: Yes
- Project name: "Gravitas Index"
- Use default dataset: Yes (production)
- Output path: `./sanity`
- Project template: Clean project (no predefined schemas)

### 4.2 Deploy Schemas

```bash
cd sanity
npm install
npx sanity deploy
```

Choose a studio hostname: `gravitasindex` (or available alternative)

### 4.3 Import Schemas

1. Schemas already exist in `sanity/schemas/`
2. Update `sanity/sanity.config.ts` if needed (should already be configured)
3. Run:
```bash
npx sanity start
```

4. Open browser to http://localhost:3333
5. Verify schemas appear in studio

### 4.4 Import Seed Data

1. In Sanity Studio (http://localhost:3333 or https://gravitasindex.sanity.studio)
2. Manually create content from `sanity/seed-data.json`:
   - Create FAQs
   - Create Case Study
   - Create Spot Counts
3. Or use Sanity CLI import (if available)

### 4.5 Get API Credentials

1. In Sanity Dashboard (https://www.sanity.io/manage)
2. Select your project
3. Go to API → Tokens
4. Click "Add API Token"
5. Name: "Gravitas Index Production"
6. Permission: "Editor"
7. Copy token

**Add to Vercel Environment Variables**:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skxxxxx
```

---

## Step 5: Configure PostHog

### 5.1 Create Account

1. Go to https://posthog.com
2. Sign up for free account (Cloud version)
3. Create organization: "Gravitas Index"

### 5.2 Create Project

1. Click "Create Project"
2. Name: "Gravitas Index"
3. Click "Create project"

### 5.3 Get API Key

1. In PostHog Dashboard, go to Project Settings
2. Copy "Project API Key" (starts with `phc_`)
3. Note the host URL (usually `https://app.posthog.com`)

**Add to Vercel Environment Variables**:
```
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 5.4 Enable Session Replay (Optional)

1. Go to Project Settings → Session Replay
2. Toggle "Enable session replay"
3. Configure privacy settings as needed

---

## Step 6: Configure Stripe

### 6.1 Activate Account

If not already done:
1. Complete business verification
2. Add bank account details
3. Verify identity

### 6.2 Create Products

**Solo Agent Product**:
1. Go to Products → Add Product
2. Name: "Gravitas Index - Solo Agent"
3. Description: "Entity Search optimization for individual agents"
4. Pricing:
   - Price: $500
   - Billing: Recurring - Monthly
   - Currency: USD
5. Save and copy **Price ID** (starts with `price_`)

**Team Product**:
1. Add another product
2. Name: "Gravitas Index - Team"
3. Description: "Entity Search optimization for teams and brokerages"
4. Pricing:
   - Price: $1,750
   - Billing: Recurring - Monthly
   - Currency: USD
5. Save and copy **Price ID**

### 6.3 Update Code with Price IDs

Edit `src/app/api/stripe/create-checkout/route.ts`:

Find this line:
```typescript
price: 'price_REPLACE_WITH_MONTHLY_PRICE_ID',
```

Replace with:
```typescript
price: planType === 'solo_agent'
  ? 'price_YOUR_SOLO_PRICE_ID'
  : 'price_YOUR_TEAM_PRICE_ID',
```

Edit `src/lib/stripe/webhook-helpers.ts`:

Update the `priceMap`:
```typescript
const priceMap: Record<string, string> = {
  'price_YOUR_SOLO_PRICE_ID': 'solo_agent',
  'price_YOUR_TEAM_PRICE_ID': 'team',
};
```

**Commit changes**:
```bash
git add .
git commit -m "feat: Add Stripe price IDs for production"
git push
```

### 6.4 Get API Keys

1. Go to Developers → API Keys
2. Toggle "Viewing test data" to **OFF** (switch to live mode)
3. Copy:
   - **Publishable key**: `pk_live_xxxxx`
   - **Secret key**: `sk_live_xxxxx` (click "Reveal")

**Add to Vercel Environment Variables**:
```
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

### 6.5 Create Webhook Endpoint

**Wait until after Vercel deployment**, then:

1. Go to Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://gravitasindex.com/api/webhooks/stripe`
4. Description: "Production webhook"
5. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
   - `invoice.payment_succeeded`
6. Click "Add endpoint"
7. Copy "Signing secret" (starts with `whsec_`)

**Add to Vercel Environment Variables**:
```
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

---

## Step 7: Configure Additional Services

### 7.1 Generate Cron Secret

```bash
openssl rand -base64 32
```

**Add to Vercel Environment Variables**:
```
CRON_SECRET=generated_secret_here
```

### 7.2 Set App URL

**Add to Vercel Environment Variables**:
```
NEXT_PUBLIC_APP_URL=https://gravitasindex.com
```

### 7.3 Intercom (Already Configured)

Already set in codebase:
```
NEXT_PUBLIC_INTERCOM_APP_ID=a92l2ygb
```

---

## Step 8: Complete Vercel Deployment

### 8.1 Add All Environment Variables

In Vercel project settings → Environment Variables, add:

```env
# App
NEXT_PUBLIC_APP_URL=https://gravitasindex.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# Resend
RESEND_API_KEY=re_xxxxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skxxxxx

# Cron
CRON_SECRET=your_generated_secret

# Intercom
NEXT_PUBLIC_INTERCOM_APP_ID=a92l2ygb
```

**Important**: For each variable, select all environments (Production, Preview, Development)

### 8.2 Deploy

1. Click "Deploy" in Vercel dashboard
2. Wait for build to complete (2-3 minutes)
3. Deployment will succeed with a URL like: `https://gravitasindex-xxx.vercel.app`

### 8.3 Verify Deployment

Visit the Vercel URL and check:
- [ ] Homepage loads
- [ ] No console errors (F12 → Console)
- [ ] Navigation works
- [ ] Images load

---

## Step 9: Configure Custom Domain

### 9.1 Add Domain to Vercel

1. In Vercel project → Settings → Domains
2. Enter: `gravitasindex.com`
3. Click "Add"
4. Also add: `www.gravitasindex.com`

### 9.2 Configure DNS

Vercel will show you DNS records to add. In your domain registrar:

**For apex domain** (gravitasindex.com):
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 9.3 Wait for Verification

- DNS propagation: 10 minutes to 48 hours
- Vercel will show "Valid Configuration" when ready
- SSL certificate automatically issued

### 9.4 Set Primary Domain

1. In Vercel → Domains
2. Click three dots next to `gravitasindex.com`
3. Select "Set as Primary Domain"
4. Ensure "Redirect to Primary Domain" is enabled for www

---

## Step 10: Post-Deployment Testing

### 10.1 Basic Functionality

**Homepage**:
- [ ] Visit https://gravitasindex.com
- [ ] Check all sections render
- [ ] Test navigation to all pages
- [ ] Verify exit intent popup (scroll to 50%)

**Forms**:
- [ ] Submit alpha form with test data
- [ ] Check Supabase for new lead record
- [ ] Verify email received (check spam folder)
- [ ] Test lead magnet download form
- [ ] Verify PDF download link in email

**Admin Dashboard**:
- [ ] Visit https://gravitasindex.com/admin/login
- [ ] Enter your admin email
- [ ] Check email for magic link
- [ ] Click link to sign in
- [ ] Verify dashboard loads
- [ ] Check leads table shows test lead
- [ ] Test lead detail view
- [ ] Add a note to a lead
- [ ] Update lead status

**Analytics**:
- [ ] Open PostHog dashboard
- [ ] Go to Live Events
- [ ] Interact with site
- [ ] Verify events appear in PostHog

### 10.2 Email Sequences

**Test Cron Job**:
```bash
curl -X GET https://gravitasindex.com/api/cron/send-emails \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

Expected response:
```json
{
  "success": true,
  "message": "Processed 0 emails",
  "sent": 0,
  "failed": 0
}
```

**Verify Automatic Execution**:
1. Check Vercel → Cron Jobs dashboard
2. Should show cron job running every 5 minutes
3. Review execution logs

**Test Email Sequence** (manually trigger):
1. Submit a test form
2. Check `email_sequences` table in Supabase
3. Should see 4 scheduled emails
4. Wait for cron job to run
5. Check email for Day 1 follow-up

### 10.3 Stripe Integration

**Test Payment Flow**:
1. Create test checkout session (use development tools)
2. Complete checkout with test card: `4242 4242 4242 4242`
3. Verify webhook received in Stripe dashboard
4. Check Supabase `subscriptions` table for new record
5. Verify lead status updated to "converted"

### 10.4 Performance Testing

**Lighthouse Audit**:
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Performance", "Accessibility", "SEO", "Best Practices"
4. Click "Analyze page load"
5. Target: 90+ on all categories

**PageSpeed Insights**:
1. Go to https://pagespeed.web.dev/
2. Enter: `https://gravitasindex.com`
3. Check both Mobile and Desktop scores
4. Target: Green scores (90+)

### 10.5 SEO Verification

**Check Sitemap**:
- Visit: https://gravitasindex.com/sitemap.xml
- Should show all pages

**Check Robots.txt**:
- Visit: https://gravitasindex.com/robots.txt
- Should show rules

**Check Structured Data**:
1. Go to https://search.google.com/test/rich-results
2. Enter: `https://gravitasindex.com`
3. Should show Organization, Website, Service schemas
4. Test FAQ page: `https://gravitasindex.com/faq`
5. Should show FAQPage schema

**Submit to Google**:
1. Go to https://search.google.com/search-console
2. Add property for `gravitasindex.com`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://gravitasindex.com/sitemap.xml`

---

## Step 11: Monitoring Setup

### 11.1 Vercel Analytics

Already enabled automatically. Check:
1. Vercel Dashboard → Analytics
2. View traffic, performance, errors

### 11.2 PostHog Monitoring

1. Set up dashboards in PostHog
2. Create funnels:
   - Homepage → Alpha Form Submitted
   - Homepage → Lead Magnet Downloaded
3. Set up alerts for critical events

### 11.3 Email Monitoring

1. Check Resend dashboard daily
2. Monitor:
   - Delivery rate (should be >95%)
   - Bounce rate (should be <5%)
   - Complaint rate (should be <0.1%)

### 11.4 Error Monitoring (Optional)

Install Sentry:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Configure in `sentry.config.js` and deploy.

---

## Troubleshooting

### Build Fails on Vercel

**Check 1**: Review build logs
- Look for TypeScript errors
- Check for missing dependencies

**Check 2**: Verify environment variables
- All required variables added
- No typos in variable names

**Check 3**: Test locally
```bash
npm run build
```
Fix any errors before deploying.

### Emails Not Sending

**Check 1**: Verify Resend domain verified
- Check DNS records propagated
- Test with `dig` command

**Check 2**: Check Resend logs
- Resend Dashboard → Logs
- Look for rejected/bounced emails

**Check 3**: Verify API key
- Correct key in environment variables
- Key has sending permissions

### Webhooks Not Working

**Check 1**: Verify endpoint URL
- Should be: `https://gravitasindex.com/api/webhooks/stripe`
- Test manually with curl

**Check 2**: Check webhook secret
- Correct secret in environment variables
- Match secret from Stripe dashboard

**Check 3**: Review logs
- Stripe Dashboard → Webhooks → Check delivery
- Vercel → Runtime Logs → Filter by webhook route

### Admin Login Not Working

**Check 1**: Verify Auth configured in Supabase
- Email provider enabled
- Redirect URLs correct

**Check 2**: Check email delivery
- Magic link email received
- Not in spam folder
- Link not expired (1 hour limit)

**Check 3**: Verify environment variables
- Supabase URL and keys correct
- Test with Supabase Studio

### Forms Not Submitting

**Check 1**: Check browser console
- Look for CORS errors
- Check for validation errors

**Check 2**: Test API directly
```bash
curl -X POST https://gravitasindex.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","market":"Denver, CO","role":"Solo Agent"}'
```

**Check 3**: Verify Supabase connection
- Check RLS policies
- Test with Supabase Studio

---

## Security Checklist

Post-deployment security verification:

- [ ] HTTPS enforced (check HSTS header)
- [ ] Security headers present (check response headers)
- [ ] Rate limiting working (test with rapid requests)
- [ ] Admin routes protected (try accessing without auth)
- [ ] Environment variables not exposed (check page source)
- [ ] Webhook endpoints secure (test without authorization)
- [ ] SQL injection prevented (Supabase handles this)
- [ ] XSS prevented (React escaping active)
- [ ] No sensitive data in client bundle
- [ ] Source maps disabled in production

---

## Launch Checklist

Before announcing to users:

### Technical
- [ ] All services configured and tested
- [ ] Forms submitting correctly
- [ ] Emails sending and sequences working
- [ ] Admin dashboard accessible
- [ ] Analytics tracking properly
- [ ] Stripe payments processing
- [ ] Cron job executing every 5 minutes
- [ ] Performance scores 90+ (Lighthouse)
- [ ] No console errors on any page
- [ ] Mobile responsive on iOS and Android

### Content
- [ ] Lead magnet PDF created and uploaded
- [ ] FAQ content populated in Sanity
- [ ] Case study data entered
- [ ] Spot counts set for markets
- [ ] All copy reviewed and proofread
- [ ] Legal pages reviewed

### Marketing
- [ ] Google Search Console configured
- [ ] Sitemap submitted
- [ ] Social media cards working (test on Facebook/Twitter)
- [ ] Analytics tags firing (PostHog, Vercel)
- [ ] Email signature links correct
- [ ] Intercom chat widget working

### Monitoring
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Uptime monitoring (optional: UptimeRobot)
- [ ] Alerts configured for critical issues

---

## Post-Launch Monitoring

### First 24 Hours

**Every 2 hours**:
- Check error logs in Vercel
- Review email delivery in Resend
- Monitor form submissions in Supabase
- Check cron job executions

**Monitor**:
- Form submission rate
- Email delivery rate
- Page load times
- Error rate

### First Week

**Daily**:
- Review PostHog analytics
- Check lead conversion rate
- Monitor email sequences
- Review Stripe activity

**Weekly**:
- Performance audit (Lighthouse)
- Security scan
- Dependency updates
- Review logs for patterns

### Ongoing

**Monthly**:
- Review analytics trends
- Update dependencies (`npm update`)
- Check for security vulnerabilities (`npm audit`)
- Performance optimization
- Content updates in Sanity

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Resend Docs**: https://resend.com/docs
- **Sanity Docs**: https://www.sanity.io/docs
- **PostHog Docs**: https://posthog.com/docs

---

## Congratulations! 🎉

Your Gravitas Index application is now live and ready for customers!

**What you've deployed**:
- Production-ready SaaS application
- Complete lead capture and nurturing system
- Automated email sequences
- Admin dashboard for management
- Stripe payment processing
- Full analytics and monitoring

**Next steps**:
1. Test thoroughly with real scenarios
2. Train on admin dashboard usage
3. Start driving traffic to the site
4. Monitor performance and optimize
5. Iterate based on user feedback

---

Last Updated: January 31, 2026
