import Stripe from 'stripe';
import { getStripe } from './client';
import { supabaseAdmin } from '@/lib/supabase/client';

/**
 * Handle successful checkout session
 * Creates or updates subscription record in database
 */
export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  try {
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    // Get subscription details from Stripe
    const subscription = await getStripe().subscriptions.retrieve(subscriptionId) as any;

    // Get lead ID from metadata (passed during checkout creation)
    const leadId = session.metadata?.lead_id;

    if (!leadId) {
      console.error('No lead_id in checkout session metadata');
      return;
    }

    // Determine plan type from price ID
    const priceId = subscription.items.data[0]?.price.id;
    const planType = getPlanTypeFromPriceId(priceId);

    // Insert subscription record
    const { error } = await supabaseAdmin.from('subscriptions').insert({
      lead_id: leadId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      plan_type: planType,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      monthly_amount: subscription.items.data[0]?.price.unit_amount || 0,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('Error inserting subscription:', error);
      return;
    }

    // Update lead status to converted
    await supabaseAdmin
      .from('leads')
      .update({ status: 'converted' })
      .eq('id', leadId);

    console.log(`Subscription created for lead ${leadId}`);
  } catch (error) {
    console.error('Error handling checkout session:', error);
    throw error;
  }
}

/**
 * Handle subscription update
 * Updates subscription status in database
 */
export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription | any
) {
  try {
    const { error } = await supabaseAdmin
      .from('subscriptions')
      .update({
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        monthly_amount: subscription.items.data[0]?.price.unit_amount || 0,
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      console.error('Error updating subscription:', error);
      return;
    }

    console.log(`Subscription updated: ${subscription.id}`);
  } catch (error) {
    console.error('Error handling subscription update:', error);
    throw error;
  }
}

/**
 * Handle subscription deletion
 * Marks subscription as canceled in database
 */
export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription | any
) {
  try {
    const { error } = await supabaseAdmin
      .from('subscriptions')
      .update({
        status: 'canceled',
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      console.error('Error canceling subscription:', error);
      return;
    }

    // Optionally update lead status
    const { data: sub } = await supabaseAdmin
      .from('subscriptions')
      .select('lead_id')
      .eq('stripe_subscription_id', subscription.id)
      .single();

    if (sub?.lead_id) {
      await supabaseAdmin
        .from('leads')
        .update({ status: 'lost' })
        .eq('id', sub.lead_id);
    }

    console.log(`Subscription canceled: ${subscription.id}`);
  } catch (error) {
    console.error('Error handling subscription deletion:', error);
    throw error;
  }
}

/**
 * Helper to determine plan type from Stripe price ID
 * Update this mapping after creating products in Stripe
 */
function getPlanTypeFromPriceId(priceId: string): string {
  // Map Stripe price IDs to plan types
  const priceMap: Record<string, string> = {
    'price_1Svkk8CF4paqURcEE0WnN8Q3': 'solo_agent', // Solo Agent: $500/month
    'price_1SvklpCF4paqURcEOlsxMhVr': 'team',       // Team: $1,750/month
  };

  return priceMap[priceId] || 'solo_agent';
}
