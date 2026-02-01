import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-01-28.clover' as any,
  typescript: true,
});

/**
 * Stripe pricing configuration
 * Solo Agent: $500/month + $1,500 setup
 * Team: $1,750/month + $1,500 setup
 */
export const STRIPE_CONFIG = {
  plans: {
    solo_agent: {
      name: 'Gravitas Index - Solo Agent',
      monthlyPrice: 50000, // $500 in cents
      setupFee: 150000, // $1,500 in cents
      description: 'Perfect for individual real estate agents',
      features: [
        'Entity Search optimization for your market',
        'Comprehensive on-page SEO',
        'Monthly performance reports',
        'Ongoing content recommendations',
      ],
    },
    team: {
      name: 'Gravitas Index - Team',
      monthlyPrice: 175000, // $1,750 in cents
      setupFee: 150000, // $1,500 in cents
      description: 'Built for teams and brokerages',
      features: [
        'Everything in Solo Agent',
        'Multi-agent team profiles',
        'Brokerage-wide optimization',
        'Advanced analytics and reporting',
        'Priority support',
      ],
    },
  },
} as const;

export type PlanType = keyof typeof STRIPE_CONFIG.plans;
