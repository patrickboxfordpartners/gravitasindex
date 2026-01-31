# Deployment Checklist - Quick Reference

Use this checklist to track your deployment progress.

---

## Pre-Deployment Setup

### Supabase (YOU HAVE THIS ✓)
- [ ] Database migration run (`supabase/migrations/20260131_initial_schema.sql`)
- [ ] Auth provider enabled (Email/OTP)
- [ ] Redirect URLs configured
- [ ] Admin user created
- [ ] API keys copied

### Stripe (YOU HAVE THIS ✓)
- [ ] Products created (Solo Agent $500/mo, Team $1,750/mo)
- [ ] Price IDs copied
- [ ] Code updated with price IDs (`src/app/api/stripe/create-checkout/route.ts`)
- [ ] Code updated with price mapping (`src/lib/stripe/webhook-helpers.ts`)
- [ ] Changes committed and pushed
- [ ] Live mode API keys ready

### Resend (TO CREATE)
- [ ] Account created
- [ ] Domain `gravitasindex.com` added
- [ ] DNS records configured (SPF, DKIM, DMARC)
- [ ] Domain verified (wait 10-15 minutes)
- [ ] API key generated

### Sanity (TO CREATE)
- [ ] Project created (`npm create sanity@latest`)
- [ ] Schemas deployed
- [ ] Studio accessible
- [ ] Seed data imported
- [ ] API token generated

### PostHog (TO CREATE)
- [ ] Account created
- [ ] Project created
- [ ] API key copied
- [ ] Session replay enabled (optional)

---

## Environment Variables

Copy this template and fill in your actual values:

```env
# App
NEXT_PUBLIC_APP_URL=https://gravitasindex.com

# Supabase (from your existing account)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Resend (create account)
RESEND_API_KEY=

# Stripe (from your existing account)
STRIPE_SECRET_KEY=sk_live_
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_
STRIPE_WEBHOOK_SECRET=whsec_

# PostHog (create account)
NEXT_PUBLIC_POSTHOG_KEY=phc_
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Sanity (create account)
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk

# Cron (generate: openssl rand -base64 32)
CRON_SECRET=

# Intercom (already configured)
NEXT_PUBLIC_INTERCOM_APP_ID=a92l2ygb
```

---

## Vercel Deployment (YOU HAVE ACCOUNT ✓)

### Initial Setup
- [ ] Log in to Vercel
- [ ] Click "Add New" → "Project"
- [ ] Import `patrickboxfordpartners/gravitasindex`
- [ ] **DON'T DEPLOY YET**

### Add Environment Variables
- [ ] Go to Settings → Environment Variables
- [ ] Add all variables from template above
- [ ] Select all environments (Production, Preview, Development)
- [ ] Verify no typos

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for build (2-3 minutes)
- [ ] Check deployment URL works

### Custom Domain
- [ ] Add `gravitasindex.com` in Settings → Domains
- [ ] Add `www.gravitasindex.com`
- [ ] Configure DNS records:
  - A record: `@` → `76.76.21.21`
  - CNAME: `www` → `cname.vercel-dns.com`
- [ ] Wait for verification
- [ ] Set `gravitasindex.com` as primary domain

---

## Post-Deployment Configuration

### Stripe Webhook (after domain is live)
- [ ] Go to Stripe → Developers → Webhooks
- [ ] Add endpoint: `https://gravitasindex.com/api/webhooks/stripe`
- [ ] Select events:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_failed`
  - `invoice.payment_succeeded`
- [ ] Copy webhook secret
- [ ] Add `STRIPE_WEBHOOK_SECRET` to Vercel env vars
- [ ] Redeploy (Vercel will auto-redeploy)

### Google Search Console
- [ ] Go to https://search.google.com/search-console
- [ ] Add property: `gravitasindex.com`
- [ ] Verify ownership (DNS or HTML file)
- [ ] Submit sitemap: `https://gravitasindex.com/sitemap.xml`

---

## Testing Checklist

### Smoke Tests
- [ ] Homepage loads (https://gravitasindex.com)
- [ ] All pages accessible (how-it-works, faq, privacy, terms)
- [ ] No console errors (F12 → Console)
- [ ] Exit intent popup works (scroll to 50%)

### Forms
- [ ] Submit alpha form with test data
- [ ] Receive welcome email
- [ ] Check lead appears in Supabase
- [ ] Check lead appears in admin dashboard
- [ ] Submit lead magnet form
- [ ] Receive PDF download link
- [ ] Test rate limiting (submit 11+ times)

### Admin Dashboard
- [ ] Visit `/admin/login`
- [ ] Receive magic link email
- [ ] Sign in successfully
- [ ] View leads table
- [ ] Filter and search leads
- [ ] View lead detail
- [ ] Add note to lead
- [ ] Update lead status
- [ ] View analytics dashboard
- [ ] Check subscriptions page

### Email Automation
- [ ] Verify cron job in Vercel dashboard
- [ ] Test manually: `curl -X GET https://gravitasindex.com/api/cron/send-emails -H "Authorization: Bearer CRON_SECRET"`
- [ ] Check email_sequences table in Supabase
- [ ] Wait for scheduled email (or manually trigger)

### Analytics
- [ ] Open PostHog dashboard
- [ ] Go to Live Events
- [ ] Interact with site
- [ ] Verify events appear
- [ ] Check funnel works

### Stripe (when ready for live payments)
- [ ] Test with real card (will charge)
- [ ] Complete checkout
- [ ] Verify webhook received
- [ ] Check subscription created in Supabase
- [ ] Verify lead status updated to "converted"
- [ ] Refund test transaction

### Performance
- [ ] Run Lighthouse audit (target: 90+ all categories)
- [ ] Test on mobile device (iOS/Android)
- [ ] Check PageSpeed Insights
- [ ] Verify images load properly
- [ ] Test on slow connection (3G)

### SEO
- [ ] Visit `/sitemap.xml` (should show all pages)
- [ ] Visit `/robots.txt` (should show rules)
- [ ] Test structured data: https://search.google.com/test/rich-results
- [ ] Share on social media (check OpenGraph preview)
- [ ] Test Twitter Card: https://cards-dev.twitter.com/validator

---

## Monitoring (First 24 Hours)

### Every 2 Hours Check:
- [ ] Vercel Runtime Logs (any errors?)
- [ ] Resend Dashboard (emails sending?)
- [ ] Supabase Logs (any issues?)
- [ ] PostHog Live Events (tracking working?)
- [ ] Cron Jobs tab in Vercel (executing?)

### Key Metrics to Watch:
- Form submission rate
- Email delivery rate
- Error rate (should be <1%)
- Page load time (should be <2s)
- Bounce rate

---

## Common Issues & Solutions

### Build fails on Vercel
**Solution**: Check build logs, verify all env vars added, test `npm run build` locally

### Emails not sending
**Solution**: Verify Resend domain verified, check DNS with `dig gravitasindex.com TXT`

### Forms returning 429 error
**Solution**: Rate limit triggered, normal behavior, will reset after 15 minutes

### Admin login not working
**Solution**: Check Supabase Auth redirect URLs include `https://gravitasindex.com/admin/dashboard`

### Cron job not running
**Solution**: Verify `vercel.json` exists, check CRON_SECRET set, view Cron Jobs tab in Vercel

### Stripe webhook failing
**Solution**: Check webhook URL exact, verify secret matches, test signature verification

---

## Quick Commands

### Test Cron Job
```bash
curl -X GET https://gravitasindex.com/api/cron/send-emails \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

### Test Lead Submission
```bash
curl -X POST https://gravitasindex.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","market":"Denver, CO","role":"Solo Agent","pain":"Test pain point"}'
```

### Check DNS Propagation
```bash
dig gravitasindex.com
dig +short gravitasindex.com TXT
```

### Generate Cron Secret
```bash
openssl rand -base64 32
```

---

## Success Criteria

Your deployment is successful when:
- ✅ All pages load without errors
- ✅ Forms submit and create leads in database
- ✅ Emails send successfully
- ✅ Admin dashboard accessible and functional
- ✅ Cron job running every 5 minutes
- ✅ Analytics tracking all events
- ✅ Lighthouse score 90+ on all metrics
- ✅ No errors in logs for 24 hours

---

## Need Help?

1. Check `DEPLOYMENT_GUIDE.md` for detailed instructions
2. Check `TROUBLESHOOTING.md` for common issues
3. Review service documentation links
4. Check Vercel/Supabase/Stripe logs
5. Test locally with `npm run dev`

---

## After Launch

### Week 1
- [ ] Monitor daily for errors
- [ ] Review analytics trends
- [ ] Test email sequences
- [ ] Gather initial user feedback

### Week 2-4
- [ ] Optimize based on data
- [ ] A/B test form copy
- [ ] Refine email sequences
- [ ] Update FAQs based on questions

### Monthly
- [ ] Review performance metrics
- [ ] Update dependencies
- [ ] Security audit
- [ ] Content refresh

---

**You're almost there!** Just configure the services and deploy. 🚀

Last Updated: January 31, 2026
