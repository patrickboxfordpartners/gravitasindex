import { NextRequest, NextResponse } from 'next/server';
import { getStripe, STRIPE_CONFIG } from '@/lib/stripe/client';
import { z } from 'zod';

const checkoutSchema = z.object({
  leadId: z.string().uuid(),
  planType: z.enum(['solo_agent', 'team']),
  email: z.string().email(),
  name: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, planType, email, name } = checkoutSchema.parse(body);

    const plan = STRIPE_CONFIG.plans[planType];

    // Create or get customer
    let customer;
    const existingCustomers = await getStripe().customers.list({
      email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await getStripe().customers.create({
        email,
        name,
        metadata: {
          lead_id: leadId,
        },
      });
    }

    // Create checkout session
    // NOTE: You'll need to create products and prices in Stripe dashboard first
    // Then update these price IDs
    const session = await getStripe().checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          // Price IDs from Stripe dashboard
          price: planType === 'solo_agent'
            ? 'price_1Svkk8CF4paqURcEE0WnN8Q3' // Solo Agent: $500/month
            : 'price_1SvklpCF4paqURcEOlsxMhVr', // Team: $1,750/month
          quantity: 1,
        },
      ],
      // Add setup fee as one-time payment
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `${plan.name} - Setup Fee`,
          metadata: {
            lead_id: leadId,
          },
        },
      },
      subscription_data: {
        metadata: {
          lead_id: leadId,
          plan_type: planType,
        },
      },
      metadata: {
        lead_id: leadId,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/canceled`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Create checkout error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
