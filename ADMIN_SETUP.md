# Admin Dashboard Setup Guide

## Overview

The Gravitas Index admin dashboard provides a complete interface for managing leads, viewing analytics, editing content, and monitoring subscriptions. Built with Supabase Auth for secure authentication.

---

## Features

### 1. Lead Management
- View all leads in sortable table
- Filter by status, role, and market
- Search by name, email, or market
- View detailed lead information
- Update lead status (new → contacted → qualified → converted/lost)
- Add notes to leads
- Track email sequences
- Quick email links

### 2. Analytics Dashboard
- Total leads and conversion metrics
- Lead funnel visualization
- Email performance tracking
- Market distribution analysis
- Role distribution breakdown
- Links to PostHog and Vercel analytics

### 3. Content Management
- Quick access to Sanity Studio
- Reference for all content types
- Instructions for editing FAQs, case studies, spot counts, testimonials

### 4. Subscription Management
- View all subscriptions
- Track monthly recurring revenue (MRR)
- Monitor subscription status
- Quick links to Stripe dashboard

---

## Step 1: Configure Supabase Auth

### 1.1 Enable Email Auth in Supabase

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable "Email" provider
3. Configure email settings:
   - **Enable Email Confirmations**: Off (for magic links)
   - **Enable Email OTP**: On
   - **Enable Magic Link**: On

### 1.2 Configure Email Templates

1. Go to Authentication → Email Templates
2. Customize the "Magic Link" template:

```html
<h2>Sign in to Gravitas Index Admin</h2>
<p>Click the link below to sign in to your admin dashboard:</p>
<p><a href="{{ .ConfirmationURL }}">Sign In</a></p>
<p>This link expires in 1 hour.</p>
```

### 1.3 Configure Redirect URLs

1. Go to Authentication → URL Configuration
2. Add to "Redirect URLs":
   - `http://localhost:3000/admin/dashboard` (development)
   - `https://gravitasindex.com/admin/dashboard` (production)

---

## Step 2: Create Admin User

### Option A: Using Supabase Dashboard (Recommended)

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Enter admin email (e.g., `admin@gravitasindex.com`)
4. Choose "Send Magic Link"
5. Check email and click link to verify

### Option B: Using SQL

```sql
-- Insert admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@gravitasindex.com',
  crypt('temporary_password', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);
```

---

## Step 3: Access Admin Dashboard

### 3.1 Development

1. Start development server:
```bash
npm run dev
```

2. Navigate to admin login:
```
http://localhost:3000/admin/login
```

3. Enter admin email
4. Check email for magic link
5. Click link to sign in

### 3.2 Production

1. Navigate to:
```
https://gravitasindex.com/admin/login
```

2. Follow same magic link flow

---

## Step 4: Dashboard Navigation

### Sidebar Navigation

- **Dashboard**: Overview with stats and recent leads
- **Leads**: Full lead management interface
- **Analytics**: Performance metrics and funnels
- **Content**: Link to Sanity Studio
- **Subscriptions**: Subscription and billing management

### Header

- Current user email displayed
- Sign out button

---

## Lead Management Workflow

### 1. View All Leads

Navigate to **Leads** from sidebar:
- See all leads in table format
- Filter by status (new, contacted, qualified, converted, lost)
- Filter by role (Solo Agent, Team Lead, Broker/Owner)
- Search by name, email, or market

### 2. View Lead Details

Click "View" on any lead:
- See full lead information
- View email sequence status
- Read and add notes
- Update status

### 3. Update Lead Status

Status workflow:
1. **New** - Just submitted, not yet contacted
2. **Contacted** - Reached out, awaiting response
3. **Qualified** - Interested, moving forward
4. **Converted** - Became paying customer
5. **Lost** - Not interested or didn't respond

Click any status button to update instantly.

### 4. Add Notes

Use notes section to track:
- Call summaries
- Meeting notes
- Follow-up reminders
- Any relevant information

Notes are timestamped automatically.

### 5. Send Email

Click "Send Email" button in lead detail to open email client with pre-filled recipient.

---

## Analytics Dashboard

### Key Metrics

- **Total Leads**: All-time lead count
- **Downloads**: Lead magnet downloads
- **Conversion Rate**: % of leads that converted to customers
- **Qualification Rate**: % of leads qualified or converted

### Lead Funnel

Visual representation of leads at each stage:
- New → Contacted → Qualified → Converted
- Shows count and percentage at each stage
- Identifies where leads drop off

### Email Performance

Track email sequences:
- Sent: Successfully delivered emails
- Pending: Scheduled but not yet sent
- Failed: Delivery failures (investigate these)

### Market Distribution

See which markets generate most leads:
- Bar chart with percentages
- Top 5 markets displayed
- Helps identify strongest geographic areas

### Role Distribution

Understand your lead profile:
- Solo Agent vs Team Lead vs Broker/Owner
- Informs targeting and messaging

### External Analytics

Quick links to:
- **PostHog**: Detailed user behavior and funnels
- **Vercel Analytics**: Performance and web vitals

---

## Content Management

### Accessing Sanity Studio

1. Click "Content" in sidebar
2. Click "Open Sanity Studio"
3. Sign in to Sanity (if not already)
4. Edit content directly

### Content Types

#### FAQs
- **Location**: /faq page
- **Fields**: question, answer, category, order
- **Usage**: Answer common questions
- **Tip**: Use order field to control display sequence

#### Case Studies
- **Location**: Homepage
- **Fields**: title, market, beforeMetrics, afterMetrics, results, date
- **Usage**: Showcase client success
- **Tip**: Update metrics regularly to keep fresh

#### Spot Counts
- **Location**: Homepage
- **Fields**: market, spotsRemaining (max 12), lastUpdated
- **Usage**: Create urgency with limited spots
- **Tip**: Update as clients sign up

#### Testimonials
- **Location**: Homepage (currently inactive)
- **Fields**: name, quote, role, avatar, featured
- **Usage**: Build social proof
- **Tip**: Set featured=true for homepage display

---

## Subscription Management

### Viewing Subscriptions

Navigate to **Subscriptions** from sidebar:
- See all customer subscriptions
- View current MRR (monthly recurring revenue)
- Filter by status (active, past_due, canceled)

### Subscription Details

Each subscription shows:
- Customer name and email
- Market
- Plan type (solo_agent or team)
- Monthly amount
- Status
- Period end date

### Managing Subscriptions

Click "View in Stripe" to:
- Update billing information
- Cancel subscription
- Issue refunds
- View payment history
- Send invoices

---

## Security & Access Control

### Authentication

- **Method**: Magic link (passwordless)
- **Session**: Cookie-based, secure
- **Duration**: Session persists until sign out
- **Middleware**: Protects all /admin routes except /admin/login

### Authorization

Current implementation:
- All authenticated users have full admin access
- No role-based permissions (can be added later)

### Future Enhancements

To add role-based access:
1. Add `role` column to `auth.users`
2. Create roles table
3. Update middleware to check role
4. Restrict routes based on role

---

## Troubleshooting

### Can't Sign In

**Issue**: Magic link not received

**Solutions**:
1. Check spam folder
2. Verify email in Supabase dashboard
3. Check Supabase email logs
4. Ensure email provider configured correctly

**Issue**: Magic link expired

**Solutions**:
1. Links expire in 1 hour
2. Request new link
3. Sign in immediately after receiving

### Dashboard Not Loading

**Issue**: Blank screen or errors

**Solutions**:
1. Check browser console for errors
2. Verify environment variables set
3. Ensure Supabase connection working
4. Clear browser cache

### Data Not Appearing

**Issue**: Leads/subscriptions not showing

**Solutions**:
1. Verify data exists in Supabase tables
2. Check RLS policies not blocking access
3. Review browser console for API errors
4. Ensure service role key configured for admin client

---

## Keyboard Shortcuts

While in admin dashboard:

- **Cmd/Ctrl + K**: Quick search (not yet implemented)
- **Esc**: Close modals
- **Tab**: Navigate form fields
- **Enter**: Submit forms

---

## Mobile Access

The admin dashboard is responsive but optimized for desktop use:
- **Desktop**: Full experience
- **Tablet**: Good experience, some tables scroll horizontally
- **Mobile**: Functional but limited, better to use desktop

---

## Performance Tips

1. **Lead Table**: Filter before searching for faster results
2. **Analytics**: Refresh periodically, cached for 60 seconds
3. **Notes**: Add concise notes to reduce database size
4. **Export**: Use Supabase or Stripe dashboard for bulk exports

---

## API Rate Limits

Be aware of service limits:
- **Supabase**: 200 requests/second
- **PostHog**: 1,000 events/request
- **Vercel**: Based on plan

If hitting limits:
- Implement request caching
- Batch operations
- Upgrade plan

---

## Backup & Export

### Lead Export

To export leads:
1. Go to Supabase Dashboard
2. Table Editor → leads
3. Click three dots → Export to CSV

### Subscription Export

To export subscription data:
1. Go to Stripe Dashboard
2. Customers → Export
3. Select date range
4. Download CSV

### Analytics Export

PostHog data:
1. Go to PostHog Dashboard
2. Insights → Create insight
3. Export → CSV

---

## Customization

### Branding

To customize admin dashboard appearance:
- Colors: Edit `tailwind.config.ts`
- Logo: Update `src/components/ui/Logo.tsx`
- Header text: Edit `src/components/admin/Header.tsx`

### Navigation

To add/remove sidebar items:
- Edit `src/components/admin/Sidebar.tsx`
- Update `navigation` array

### Lead Statuses

To add custom statuses:
1. Update dropdown in `src/app/admin/dashboard/leads/[id]/page.tsx`
2. Update database enum if using constraints
3. Update analytics dashboard status filters

---

## Future Enhancements

Potential additions (not in current scope):

### Phase 7+:
- [ ] Bulk lead actions (export, delete, status update)
- [ ] Email compose directly in dashboard
- [ ] Calendar integration for follow-up reminders
- [ ] Task management for lead follow-ups
- [ ] Team collaboration (assign leads to team members)
- [ ] Role-based permissions
- [ ] Audit logs for all changes
- [ ] Dashboard widgets (drag-and-drop)
- [ ] Mobile app
- [ ] API access for integrations

---

## Support & Resources

### Documentation
- Supabase Auth: https://supabase.com/docs/guides/auth
- Next.js Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware
- Supabase RLS: https://supabase.com/docs/guides/auth/row-level-security

### Help
- For bugs: Create issue in GitHub repo
- For questions: Email support@gravitasindex.com
- For Supabase issues: Check Supabase support

---

## Summary

The admin dashboard provides:
✅ Secure magic link authentication
✅ Complete lead management
✅ Real-time analytics
✅ Content management integration
✅ Subscription tracking
✅ Mobile responsive
✅ Production-ready

**Next Step**: Configure Stripe integration (Phase 8) to enable subscription functionality.

---

Last Updated: January 31, 2026
