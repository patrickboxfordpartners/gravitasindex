# Stripe Payment Integration Setup Guide

## Overview

Stripe integration enables subscription payments for Gravitas Index. Customers can choose between two plans:
- **Solo Agent**: $500/month + $1,500 setup fee
- **Team**: $1,750/month + $1,500 setup fee

---

## Step 1: Create Stripe Account

### 1.1 Sign Up

1. Go to https://stripe.com
2. Click "Sign Up"
3. Enter business information
4. Complete verification (may take 1-2 days for full approval)

### 1.2 Activate Account

Complete Stripe's requirements:
- Business details
- Bank account information
- Identity verification
- Tax information

---

## Step 2: Create Products and Prices

### 2.1 Create Solo Agent Product

1. Go to Stripe Dashboard → Products
2. Click "Add Product"
3. Enter details:
   - **Name**: Gravitas Index - Solo Agent
   - **Description**: Entity Search optimization for individual real estate agents
   - **Image**: Upload product image (optional)

4. Add pricing:
   - **Price**: $500
   - **Billing period**: Monthly
   - **Currency**: USD

5. Click "Save Product"
6. **Copy the Price ID** (starts with `price_`) - you'll need this later

### 2.2 Create Team Product

1. Click "Add Product" again
2. Enter details:
   - **Name**: Gravitas Index - Team
   - **Description**: Entity Search optimization for teams and brokerages
   - **Image**: Upload product image (optional)

3. Add pricing:
   - **Price**: $1,750
   - **Billing period**: Monthly
   - **Currency**: USD

4. Click "Save Product"
5. **Copy the Price ID** - you'll need this later

### 2.3 Optional: Create Setup Fee Products

For one-time $1,500 setup fee:

1. Create new product: "Gravitas Index - Setup Fee"
2. Price: $1,500 one-time
3. Copy Price ID

---

## Step 3: Configure Environment Variables

Add to `.env.local`:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Getting API Keys

1. Go to Stripe Dashboard → Developers → API Keys
2. Copy:
   - **Publishable key** (starts with `pk_test_` for test mode)
   - **Secret key** (starts with `sk_test_` for test mode)

**Important**: Use test keys during development, production keys only in production.

---

## Step 4: Update Price IDs in Code

### 4.1 Update Checkout Route

Edit `src/app/api/stripe/create-checkout/route.ts`:

```typescript
// Replace this line:
price: 'price_REPLACE_WITH_MONTHLY_PRICE_ID',

// With your actual price ID:
price: planType === 'solo_agent'
  ? 'price_1234567890' // Solo Agent price ID
  : 'price_0987654321', // Team price ID
```

### 4.2 Update Webhook Helper

Edit `src/lib/stripe/webhook-helpers.ts` in the `getPlanTypeFromPriceId` function:

```typescript
const priceMap: Record<string, string> = {
  'price_1234567890': 'solo_agent', // Your Solo Agent price ID
  'price_0987654321': 'team', // Your Team price ID
};
```

---

## Step 5: Set Up Webhooks

### 5.1 Create Webhook Endpoint

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add Endpoint"
3. Enter endpoint URL:
   - **Development**: Use Stripe CLI (see below)
   - **Production**: `https://gravitasindex.com/api/webhooks/stripe`

4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
   - `invoice.payment_succeeded`

5. Click "Add Endpoint"
6. **Copy the Webhook Secret** (starts with `whsec_`)
7. Add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### 5.2 Test Webhooks Locally

Install Stripe CLI:
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Linux
Download from: https://github.com/stripe/stripe-cli/releases
```

Forward webhooks to local dev server:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This command will output a webhook secret like `whsec_...`. Use this in `.env.local` for development.

---

## Step 6: Configure Checkout Flow

### Option A: Manual Payment Links (Recommended for MVP)

**Simplest approach** - share Stripe-hosted payment links after qualification calls:

1. Go to Stripe Dashboard → Payment Links
2. Create payment link for each product
3. Share links manually with qualified leads
4. Webhook will automatically create subscription records

**Benefits:**
- No custom checkout page needed
- Stripe handles all payment UI
- Quick to set up
- Professional payment experience

**Process:**
1. Lead qualifies on call
2. Admin shares appropriate payment link via email
3. Customer completes payment on Stripe
4. Webhook creates subscription in database
5. Admin receives notification

### Option B: Custom Checkout (More Integrated)

Build custom checkout page:

```typescript
// src/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout(planType: 'solo_agent' | 'team') {
    setLoading(true);

    // Create checkout session
    const response = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: 'lead-id-here',
        planType,
        email: 'customer@example.com',
        name: 'Customer Name',
      }),
    });

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    await stripe?.redirectToCheckout({ sessionId });

    setLoading(false);
  }

  return (
    <div>
      <button onClick={() => handleCheckout('solo_agent')}>
        Subscribe - Solo Agent ($500/mo)
      </button>
      <button onClick={() => handleCheckout('team')}>
        Subscribe - Team ($1,750/mo)
      </button>
    </div>
  );
}
```

---

## Step 7: Test Payment Flow

### 7.1 Use Test Cards

Stripe provides test card numbers:

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/34)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Failed Payment:**
- Card: `4000 0000 0000 0002`

**Requires Authentication (3D Secure):**
- Card: `4000 0025 0000 3155`

### 7.2 Test Subscription Creation

1. Start dev server: `npm run dev`
2. Start Stripe webhook forwarding: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Create payment link or use checkout page
4. Complete checkout with test card
5. Verify:
   - Webhook receives `checkout.session.completed`
   - Subscription created in Supabase `subscriptions` table
   - Lead status updated to `converted`

---

## Step 8: Customer Portal

The Customer Portal allows customers to:
- Update payment method
- View invoices
- Cancel subscription
- Download receipts

### 8.1 Enable Customer Portal

1. Go to Stripe Dashboard → Settings → Billing → Customer Portal
2. Configure settings:
   - **Allow customers to**: Update payment methods, Cancel subscriptions
   - **Cancellation**: Immediate or at period end
   - **Terms of Service**: Add link (optional)
3. Save settings

### 8.2 Generate Portal Links

Admins can generate portal links for customers:

```typescript
// API call from admin dashboard
const response = await fetch('/api/stripe/customer-portal', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ leadId: 'lead-id-here' }),
});

const { url } = await response.json();
// Send URL to customer or redirect them
```

---

## Step 9: Handle Subscription Events

### Event Flow

1. **checkout.session.completed**
   - Customer completes payment
   - Subscription record created in database
   - Lead status updated to "converted"
   - Welcome email sent (optional)

2. **customer.subscription.updated**
   - Subscription renewed
   - Payment method updated
   - Plan changed
   - Database updated

3. **customer.subscription.deleted**
   - Customer cancels
   - Subscription marked as "canceled"
   - Lead status updated to "lost" (optional)
   - Exit email sent (optional)

4. **invoice.payment_failed**
   - Automatic retry by Stripe
   - Send reminder email
   - Admin notification

5. **invoice.payment_succeeded**
   - Log successful payment
   - Send receipt (optional)

### Monitoring

Check webhook delivery:
1. Go to Stripe Dashboard → Developers → Webhooks
2. Click on your endpoint
3. View "Recent events" for successes/failures
4. Debug failed events with logs

---

## Step 10: Production Deployment

### 10.1 Switch to Live Mode

1. Go to Stripe Dashboard
2. Toggle from "Test mode" to "Live mode" (top right)
3. Create products and prices in live mode (same as Step 2)
4. Get live API keys:
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`

### 10.2 Update Environment Variables

In Vercel (or your hosting):
```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### 10.3 Create Production Webhook

1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://gravitasindex.com/api/webhooks/stripe`
3. Select same events as test
4. Copy webhook secret
5. Add to Vercel env vars:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### 10.4 Test Live Payment

**Use real payment method** (will be charged):
1. Complete checkout flow
2. Verify subscription created
3. Check webhook delivery
4. Confirm database updated
5. Refund test payment if needed

---

## Troubleshooting

### Webhook Not Receiving Events

**Check 1: Webhook URL**
- Verify URL is correct and publicly accessible
- Test with: `curl https://gravitasindex.com/api/webhooks/stripe`

**Check 2: Webhook Secret**
- Ensure `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Regenerate secret if needed

**Check 3: Event Selection**
- Verify required events are selected in Stripe webhook settings

**Check 4: Logs**
- Check Vercel logs for errors
- Check Stripe dashboard webhook delivery logs

### Subscription Not Created

**Check 1: Database Connection**
- Verify Supabase credentials correct
- Check RLS policies allow service role

**Check 2: Metadata**
- Ensure `lead_id` passed in checkout session metadata
- Check Stripe dashboard for session metadata

**Check 3: Price ID Mapping**
- Verify price IDs in `getPlanTypeFromPriceId` function
- Check actual price IDs from Stripe dashboard

### Payment Fails

**Check 1: Test vs Live Mode**
- Don't mix test and live keys
- Use test cards in test mode only

**Check 2: Card Errors**
- Insufficient funds
- Card declined by bank
- CVC mismatch

**Check 3: 3D Secure**
- Some cards require authentication
- Ensure customer completes authentication flow

---

## Security Best Practices

### 1. Protect Secret Keys
- Never commit secret keys to git
- Use environment variables only
- Rotate keys periodically

### 2. Verify Webhook Signatures
- Always verify `stripe-signature` header
- Use `stripe.webhooks.constructEvent()`
- Reject unverified webhooks

### 3. Use HTTPS
- All webhook URLs must use HTTPS
- No HTTP in production

### 4. Validate Amounts
- Verify payment amounts match expected prices
- Check for tampered data
- Log suspicious activity

### 5. Rate Limiting
- Implement rate limits on checkout API
- Prevent abuse
- Monitor for unusual patterns

---

## Pricing Strategy

### Current Pricing

- **Solo Agent**: $500/month
- **Team**: $1,750/month
- **Setup Fee**: $1,500 (one-time)

### Considerations

**Volume Discounts:**
- Offer discount for annual prepayment
- Create coupon codes in Stripe

**Trial Periods:**
- Add free trial (e.g., 14 days)
- Configure in Stripe product settings
- Requires payment method upfront

**Promotions:**
- Create coupon codes for special offers
- Share codes with leads
- Track usage in Stripe dashboard

---

## Reporting

### Stripe Dashboard Metrics

View in Stripe Dashboard → Reports:
- Monthly Recurring Revenue (MRR)
- Customer Lifetime Value (LTV)
- Churn rate
- Failed payment rate
- Revenue growth

### Custom Reports

Export data via Stripe API:
```typescript
// Get all subscriptions
const subscriptions = await stripe.subscriptions.list({
  limit: 100,
  status: 'active',
});

// Calculate MRR
const mrr = subscriptions.data.reduce((sum, sub) => {
  return sum + (sub.items.data[0]?.price.unit_amount || 0);
}, 0) / 100; // Convert cents to dollars
```

---

## Customer Communication

### Payment Success Email

Send after successful payment:
```
Subject: Welcome to Gravitas Index!

Hi [Name],

Your payment has been processed successfully. Welcome to Gravitas Index!

Plan: [Solo Agent / Team]
Amount: $[500/1,750]/month
Next billing date: [Date]

What happens next:
1. We'll reach out within 24 hours to schedule onboarding
2. Setup begins immediately
3. Your first report arrives in 30 days

Questions? Reply to this email or call [phone].

Manage your subscription:
[Customer Portal Link]

Thanks for your business!
```

### Payment Failed Email

Send after failed payment:
```
Subject: Payment Issue with Your Gravitas Index Subscription

Hi [Name],

We tried to charge your payment method on file, but the payment failed.

Please update your payment method to avoid service interruption:
[Customer Portal Link]

Questions? Contact us at billing@gravitasindex.com

Thanks,
Gravitas Index Team
```

---

## Future Enhancements

Potential additions (not in current scope):

- [ ] Usage-based billing (per market or location)
- [ ] Add-on products (extra markets, rush setup)
- [ ] Referral program with Stripe promo codes
- [ ] Partner/reseller pricing tiers
- [ ] Enterprise custom pricing
- [ ] Automatic invoice generation and delivery
- [ ] Payment plan for setup fee (split into installments)
- [ ] Free trial period
- [ ] Money-back guarantee flow

---

## Support Resources

- **Stripe Documentation**: https://stripe.com/docs
- **Webhooks Guide**: https://stripe.com/docs/webhooks
- **Testing**: https://stripe.com/docs/testing
- **API Reference**: https://stripe.com/docs/api
- **Stripe CLI**: https://stripe.com/docs/stripe-cli

---

## Summary Checklist

- [ ] Create Stripe account
- [ ] Verify business details
- [ ] Create products (Solo Agent, Team)
- [ ] Get price IDs
- [ ] Update environment variables
- [ ] Update price IDs in code
- [ ] Set up webhook endpoint
- [ ] Test with test cards
- [ ] Configure Customer Portal
- [ ] Test complete flow (checkout → webhook → database)
- [ ] Create payment links or checkout page
- [ ] Switch to live mode for production
- [ ] Update production environment variables
- [ ] Create production webhook
- [ ] Test live payment
- [ ] Monitor webhook delivery

---

Last Updated: January 31, 2026
