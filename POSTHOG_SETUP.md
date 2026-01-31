# PostHog Analytics Setup Guide

## Overview

Your Gravitas Index application now has comprehensive analytics tracking with PostHog. This allows you to understand user behavior, optimize conversion funnels, and make data-driven decisions.

---

## Step 1: Create PostHog Account

### 1.1 Sign Up

**Option A: Cloud (Recommended for Getting Started)**
```bash
# Go to https://posthog.com
# Sign up for free account
# Get instant access to analytics dashboard
```

**Option B: Self-Hosted (For Data Control)**
```bash
# Deploy PostHog on your own infrastructure
# See: https://posthog.com/docs/self-host
```

### 1.2 Create Project

After signing up:
1. Create new project: "Gravitas Index"
2. Note your Project API Key
3. Note your Project Host URL (usually `https://app.posthog.com`)

---

## Step 2: Configure Environment Variables

Add to `.env.local`:
```env
NEXT_PUBLIC_POSTHOG_KEY=phc_your_project_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Important**:
- Keys starting with `NEXT_PUBLIC_` are exposed to the browser
- This is safe for PostHog as it's designed for client-side tracking
- Never put sensitive keys (API secrets) in `NEXT_PUBLIC_` vars

---

## Step 3: Verify Installation

### 3.1 Start Development Server
```bash
npm run dev
```

### 3.2 Check Browser Console
Open browser dev tools and look for:
```
PostHog initialized
```

### 3.3 Check PostHog Dashboard
1. Go to PostHog dashboard
2. Navigate to Live Events
3. Interact with your site (visit pages, click buttons)
4. See events appear in real-time

---

## Events Being Tracked

### Page Views
**Automatic tracking on every route change**
- Event: `$pageview`
- Properties: URL, pathname, title

### Alpha Form Events
1. **alpha_form_viewed** - User sees the form
2. **alpha_form_started** - User begins filling out form
3. **alpha_form_submitted** - Successful submission
4. **alpha_form_error** - Submission error
   - Properties: error message, market

### Lead Magnet Events
1. **exit_intent_triggered** - Popup shown
   - Properties: trigger type (mouse_leave or scroll_depth)
2. **lead_magnet_viewed** - User sees modal
3. **lead_magnet_submitted** - User downloads playbook
4. **lead_magnet_closed** - User closes modal
   - Properties: reason (background_click, escape, etc.)

### Navigation Events
1. **cta_clicked** - Any call-to-action button
   - Properties: label, location, target
2. **nav_link_clicked** - Navigation clicks
3. **external_link_clicked** - Links to external sites

### User Identification
When users submit forms, they are automatically identified:
```typescript
identifyUser(leadId, {
  name: 'Jane Smith',
  email: 'jane@example.com',
  market: 'Denver, CO',
  role: 'Solo Agent',
});
```

This allows you to:
- Track individual user journeys
- See all events for a specific lead
- Segment users by properties

---

## Conversion Funnels

### Alpha Form Funnel
Track the complete conversion path:
```
1. page_viewed (homepage)
   ↓
2. alpha_form_viewed
   ↓
3. alpha_form_started
   ↓
4. alpha_form_submitted
```

**In PostHog Dashboard:**
1. Go to Insights → Funnels
2. Create new funnel with these events
3. See drop-off rates at each step
4. Identify optimization opportunities

### Lead Magnet Funnel
```
1. page_viewed
   ↓
2. exit_intent_triggered
   ↓
3. lead_magnet_viewed
   ↓
4. lead_magnet_submitted
```

**Analysis:**
- Exit intent conversion rate
- Modal abandonment rate
- Total lead magnet downloads

---

## Dashboards to Create

### 1. Lead Generation Dashboard

**Metrics:**
- Total form submissions (alpha + lead magnet)
- Conversion rate by source
- Daily/weekly lead trend
- Top markets by volume

**Events to Include:**
- `alpha_form_submitted`
- `lead_magnet_submitted`
- Group by `market` property

### 2. User Behavior Dashboard

**Metrics:**
- Page views by path
- Average session duration
- Bounce rate
- Most viewed pages

**Events to Include:**
- `$pageview`
- `$pageleave`
- Session replay links

### 3. Conversion Funnel Dashboard

**Metrics:**
- Homepage → Alpha form (%)
- Alpha form view → Submit (%)
- Exit intent → Download (%)
- Overall site conversion rate

### 4. Error Monitoring Dashboard

**Metrics:**
- Form submission errors
- Error messages frequency
- Error rate trend

**Events to Include:**
- `alpha_form_error`
- Filter by `error` property

---

## Session Replay

PostHog includes session replay to watch actual user sessions.

### Enable Session Replay
1. Go to PostHog Project Settings
2. Enable Session Replay
3. Set recording preferences:
   - Record all sessions, or
   - Record only sessions with events

### Privacy Controls
Configure what gets recorded:
- Mask sensitive inputs (default)
- Exclude specific pages
- Block recording of form fields

### Viewing Replays
1. Go to Session Recordings
2. Filter by:
   - Users who submitted forms
   - Users who abandoned forms
   - Specific error events
3. Watch recordings to understand user behavior

---

## Advanced Features

### Feature Flags

Test different variations:
```typescript
import posthog from 'posthog-js';

const showNewCTA = posthog.isFeatureEnabled('new-cta-design');
```

Use cases:
- A/B test form layouts
- Test different lead magnet offers
- Gradual rollout of new features

### Cohorts

Group users for analysis:
- Users from specific markets
- Users who downloaded lead magnet
- Users who submitted but didn't convert

### Experiments

Run A/B tests:
1. Create experiment in PostHog
2. Define variants
3. Measure conversion differences
4. Make data-driven decisions

---

## Privacy & Compliance

### GDPR/CCPA Compliance

PostHog includes privacy features:
- User data deletion
- Opt-out mechanisms
- Data export

### Implementing Consent

Add cookie consent banner:
```typescript
// Only initialize PostHog after consent
if (userConsent) {
  initPostHog();
}
```

### Data Retention

Configure in PostHog settings:
- How long to keep event data
- When to delete session replays
- User data retention policies

---

## Custom Events

### Adding New Events

In your components:
```typescript
import { trackEvent } from '@/lib/analytics/posthog';

// Track custom event
trackEvent('custom_event_name', {
  property1: 'value1',
  property2: 'value2',
});
```

### Recommended Additional Events

**Email Engagement:**
- `email_opened`
- `email_link_clicked`
- Track in email templates

**Page Engagement:**
- `section_viewed` - When user scrolls to section
- `video_played` - If you add videos
- `faq_expanded` - FAQ interactions

**Booking Events:**
- `cal_booking_started`
- `cal_booking_completed`
- Track Cal.com integration

---

## Performance Monitoring

PostHog tracks performance metrics:
- Page load times
- Time to first byte (TTFB)
- Largest contentful paint (LCP)
- First input delay (FID)

Access via: Insights → Web Vitals

---

## Alerts & Notifications

### Set Up Alerts

1. Go to Insights
2. Create visualization
3. Click "Set alert"
4. Configure:
   - Threshold (e.g., < 5 form submissions/day)
   - Recipients
   - Frequency

**Recommended Alerts:**
- Form submission rate drops
- Error rate increases
- Conversion funnel drop-off spikes

---

## Integration with Admin Dashboard

In Phase 7, we'll build an admin dashboard that:
- Displays PostHog metrics
- Shows real-time analytics
- Embeds funnels and insights
- Links session replays to leads

For now, use PostHog dashboard directly at: https://app.posthog.com

---

## Troubleshooting

### Events Not Appearing

**Check 1: Environment Variables**
```bash
# Verify in terminal
echo $NEXT_PUBLIC_POSTHOG_KEY
# Should print your key
```

**Check 2: Browser Console**
- Open DevTools → Console
- Look for "PostHog initialized"
- Check for error messages

**Check 3: Network Tab**
- Open DevTools → Network
- Filter by "posthog"
- Verify events are being sent

### Events Delayed

PostHog processes events in batches:
- Events may take 30-60 seconds to appear
- Check "Live Events" for real-time view
- Historical data in Insights updates hourly

### Duplicate Events

If seeing duplicates:
- Check React StrictMode (dev only)
- Verify useEffect dependencies
- Ensure PostHog initialized once

---

## Best Practices

### 1. Event Naming
- Use SCREAMING_SNAKE_CASE
- Be descriptive: `alpha_form_submitted` not `form_submit`
- Group related events: `alpha_form_*`, `lead_magnet_*`

### 2. Properties
- Include context: market, role, source
- Use consistent property names
- Don't track PII in properties (use identify() instead)

### 3. Performance
- Track sparingly in loops
- Batch events when possible
- Don't block UI for analytics

### 4. Testing
- Test tracking in development
- Verify events in PostHog dashboard
- Use filters to separate dev/prod data

---

## Resources

- **PostHog Docs**: https://posthog.com/docs
- **Event Tracking Guide**: https://posthog.com/docs/integrate/client/js
- **Funnels**: https://posthog.com/docs/user-guides/funnels
- **Session Replay**: https://posthog.com/docs/session-replay
- **Feature Flags**: https://posthog.com/docs/feature-flags

---

## Next Steps

1. **Set up PostHog account** (5 minutes)
2. **Add API key to .env.local**
3. **Test tracking** (visit site, check dashboard)
4. **Create funnels** (alpha form, lead magnet)
5. **Enable session replay**
6. **Set up alerts** (form submissions, errors)

Once configured, analytics will automatically track all user interactions and provide insights for optimization.

---

Last Updated: January 31, 2026
