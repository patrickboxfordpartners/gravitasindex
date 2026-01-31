'use client';

import { useState, useEffect } from 'react';
import { createClientSupabaseClient } from '@/lib/supabase/client-auth';
import { Card } from '@/components/ui/Card';

type Subscription = {
  id: string;
  lead_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  plan_type: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  monthly_amount: number;
  created_at: string;
  leads?: {
    name: string;
    email: string;
    market: string;
  };
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClientSupabaseClient();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  async function fetchSubscriptions() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*, leads(name, email, market)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  }

  const activeSubscriptions = subscriptions.filter((sub) => sub.status === 'active');
  const totalMRR = activeSubscriptions.reduce((sum, sub) => sum + (sub.monthly_amount || 0), 0);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto"></div>
        <p className="text-text-muted mt-4">Loading subscriptions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-normal mb-2 text-text-main">Subscriptions</h2>
        <p className="text-text-muted">Manage customer subscriptions and billing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-text-muted text-sm mb-2">Total Subscriptions</p>
          <p className="font-serif text-4xl text-text-main">{subscriptions.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-text-muted text-sm mb-2">Active Subscriptions</p>
          <p className="font-serif text-4xl text-text-main">{activeSubscriptions.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-text-muted text-sm mb-2">Monthly Recurring Revenue</p>
          <p className="font-serif text-4xl text-text-main">${totalMRR.toLocaleString()}</p>
        </Card>
      </div>

      {subscriptions.length > 0 ? (
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Market</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Period End</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="border-b border-border hover:bg-bg transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-text-main font-medium">{sub.leads?.name || 'Unknown'}</p>
                        <p className="text-text-muted text-sm">{sub.leads?.email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-text-main">{sub.leads?.market || 'N/A'}</td>
                    <td className="py-4 px-4 text-text-main capitalize">{sub.plan_type.replace('_', ' ')}</td>
                    <td className="py-4 px-4 text-text-main">${sub.monthly_amount}/mo</td>
                    <td className="py-4 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        sub.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        sub.status === 'past_due' ? 'bg-yellow-500/20 text-yellow-400' :
                        sub.status === 'canceled' ? 'bg-red-500/20 text-red-400' :
                        'bg-border text-text-muted'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-text-muted text-sm">
                      {new Date(sub.current_period_end).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <a
                        href={`https://dashboard.stripe.com/subscriptions/${sub.stripe_subscription_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline text-sm"
                      >
                        View in Stripe
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="p-12">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-text-muted mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            <h3 className="font-serif text-xl mb-2 text-text-main">No Subscriptions Yet</h3>
            <p className="text-text-muted mb-6">
              Subscriptions will appear here once customers complete payment through Stripe.
            </p>
            <p className="text-sm text-text-muted">
              Note: Stripe integration (Phase 8) must be completed for subscriptions to appear.
            </p>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h3 className="font-serif text-xl mb-4 text-text-main">Stripe Dashboard</h3>
        <a
          href="https://dashboard.stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 bg-bg border border-border rounded hover:border-accent transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text-main mb-1">Open Stripe Dashboard</p>
              <p className="text-sm text-text-muted">
                Manage payments, subscriptions, and customer billing
              </p>
            </div>
            <svg
              className="w-5 h-5 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </a>
      </Card>
    </div>
  );
}
