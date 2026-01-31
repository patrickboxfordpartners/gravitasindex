'use client';

import { useState, useEffect } from 'react';
import { createClientSupabaseClient } from '@/lib/supabase/client-auth';
import { Card } from '@/components/ui/Card';

type LeadStats = {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  lostLeads: number;
};

type MarketStats = {
  market: string;
  count: number;
};

type RoleStats = {
  role: string;
  count: number;
};

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [leadStats, setLeadStats] = useState<LeadStats>({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    qualifiedLeads: 0,
    convertedLeads: 0,
    lostLeads: 0,
  });
  const [marketStats, setMarketStats] = useState<MarketStats[]>([]);
  const [roleStats, setRoleStats] = useState<RoleStats[]>([]);
  const [downloadCount, setDownloadCount] = useState(0);
  const [emailStats, setEmailStats] = useState({ sent: 0, pending: 0, failed: 0 });

  const supabase = createClientSupabaseClient();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    setLoading(true);
    try {
      // Fetch all leads
      const { data: leads } = await supabase
        .from('leads')
        .select('status, market, role');

      if (leads) {
        // Calculate lead stats
        const stats = {
          totalLeads: leads.length,
          newLeads: leads.filter((l) => l.status === 'new').length,
          contactedLeads: leads.filter((l) => l.status === 'contacted').length,
          qualifiedLeads: leads.filter((l) => l.status === 'qualified').length,
          convertedLeads: leads.filter((l) => l.status === 'converted').length,
          lostLeads: leads.filter((l) => l.status === 'lost').length,
        };
        setLeadStats(stats);

        // Calculate market distribution
        const marketMap = new Map<string, number>();
        leads.forEach((lead) => {
          marketMap.set(lead.market, (marketMap.get(lead.market) || 0) + 1);
        });
        const markets = Array.from(marketMap.entries())
          .map(([market, count]) => ({ market, count }))
          .sort((a, b) => b.count - a.count);
        setMarketStats(markets);

        // Calculate role distribution
        const roleMap = new Map<string, number>();
        leads.forEach((lead) => {
          roleMap.set(lead.role, (roleMap.get(lead.role) || 0) + 1);
        });
        const roles = Array.from(roleMap.entries())
          .map(([role, count]) => ({ role, count }))
          .sort((a, b) => b.count - a.count);
        setRoleStats(roles);
      }

      // Fetch download count
      const { count: downloads } = await supabase
        .from('lead_magnet_downloads')
        .select('*', { count: 'exact', head: true });
      setDownloadCount(downloads || 0);

      // Fetch email stats
      const { data: emails } = await supabase
        .from('email_sequences')
        .select('status');

      if (emails) {
        const emailCounts = {
          sent: emails.filter((e) => e.status === 'sent').length,
          pending: emails.filter((e) => e.status === 'pending').length,
          failed: emails.filter((e) => e.status === 'failed').length,
        };
        setEmailStats(emailCounts);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  const conversionRate = leadStats.totalLeads > 0
    ? ((leadStats.convertedLeads / leadStats.totalLeads) * 100).toFixed(1)
    : '0';

  const qualificationRate = leadStats.totalLeads > 0
    ? (((leadStats.qualifiedLeads + leadStats.convertedLeads) / leadStats.totalLeads) * 100).toFixed(1)
    : '0';

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto"></div>
        <p className="text-text-muted mt-4">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-normal mb-2 text-text-main">Analytics</h2>
        <p className="text-text-muted">Performance metrics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-text-muted text-sm mb-2">Total Leads</p>
          <p className="font-serif text-4xl text-text-main">{leadStats.totalLeads}</p>
        </Card>
        <Card className="p-6">
          <p className="text-text-muted text-sm mb-2">Downloads</p>
          <p className="font-serif text-4xl text-text-main">{downloadCount}</p>
        </Card>
        <Card className="p-6">
          <p className="text-text-muted text-sm mb-2">Conversion Rate</p>
          <p className="font-serif text-4xl text-text-main">{conversionRate}%</p>
        </Card>
        <Card className="p-6">
          <p className="text-text-muted text-sm mb-2">Qualification Rate</p>
          <p className="font-serif text-4xl text-text-main">{qualificationRate}%</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-serif text-xl mb-6 text-text-main">Lead Funnel</h3>
          <div className="space-y-4">
            {[
              { label: 'New', value: leadStats.newLeads, color: 'bg-accent' },
              { label: 'Contacted', value: leadStats.contactedLeads, color: 'bg-blue-500' },
              { label: 'Qualified', value: leadStats.qualifiedLeads, color: 'bg-green-500' },
              { label: 'Converted', value: leadStats.convertedLeads, color: 'bg-purple-500' },
              { label: 'Lost', value: leadStats.lostLeads, color: 'bg-red-500' },
            ].map((stage) => {
              const percentage = leadStats.totalLeads > 0
                ? (stage.value / leadStats.totalLeads) * 100
                : 0;

              return (
                <div key={stage.label}>
                  <div className="flex justify-between mb-2">
                    <span className="text-text-main">{stage.label}</span>
                    <span className="text-text-muted">
                      {stage.value} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-border h-3 rounded overflow-hidden">
                    <div
                      className={`${stage.color} h-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-serif text-xl mb-6 text-text-main">Email Performance</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-text-main">Sent</span>
                <span className="text-text-main font-medium">{emailStats.sent}</span>
              </div>
              <div className="w-full bg-border h-3 rounded overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-text-main">Pending</span>
                <span className="text-text-main font-medium">{emailStats.pending}</span>
              </div>
              <div className="w-full bg-border h-3 rounded overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-text-main">Failed</span>
                <span className="text-text-main font-medium">{emailStats.failed}</span>
              </div>
              <div className="w-full bg-border h-3 rounded overflow-hidden">
                <div className="bg-red-500 h-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-serif text-xl mb-6 text-text-main">Leads by Market</h3>
          {marketStats.length > 0 ? (
            <div className="space-y-4">
              {marketStats.slice(0, 5).map((stat) => {
                const percentage = (stat.count / leadStats.totalLeads) * 100;
                return (
                  <div key={stat.market}>
                    <div className="flex justify-between mb-2">
                      <span className="text-text-main">{stat.market}</span>
                      <span className="text-text-muted">
                        {stat.count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-border h-2 rounded overflow-hidden">
                      <div
                        className="bg-accent h-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-text-muted text-center py-8">No data yet</p>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="font-serif text-xl mb-6 text-text-main">Leads by Role</h3>
          {roleStats.length > 0 ? (
            <div className="space-y-4">
              {roleStats.map((stat) => {
                const percentage = (stat.count / leadStats.totalLeads) * 100;
                return (
                  <div key={stat.role}>
                    <div className="flex justify-between mb-2">
                      <span className="text-text-main">{stat.role}</span>
                      <span className="text-text-muted">
                        {stat.count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full bg-border h-2 rounded overflow-hidden">
                      <div
                        className="bg-accent h-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-text-muted text-center py-8">No data yet</p>
          )}
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-serif text-xl mb-4 text-text-main">External Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://app.posthog.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-bg border border-border rounded hover:border-accent transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-main mb-1">PostHog Dashboard</p>
                <p className="text-sm text-text-muted">View detailed user behavior and funnels</p>
              </div>
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
          <a
            href="https://vercel.com/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-bg border border-border rounded hover:border-accent transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text-main mb-1">Vercel Analytics</p>
                <p className="text-sm text-text-muted">View performance metrics and web vitals</p>
              </div>
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        </div>
      </Card>
    </div>
  );
}
