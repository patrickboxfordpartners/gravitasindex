import { createServerSupabaseClient } from '@/lib/supabase/auth';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();

  // Fetch overview stats
  const [
    { count: totalLeads },
    { count: newLeads },
    { count: downloadCount },
    { count: subscriberCount }
  ] = await Promise.all([
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new'),
    supabase.from('lead_magnet_downloads').select('*', { count: 'exact', head: true }),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true })
  ]);

  // Recent leads
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const stats = [
    { label: 'Total Leads', value: totalLeads || 0, href: '/admin/dashboard/leads' },
    { label: 'New Leads', value: newLeads || 0, href: '/admin/dashboard/leads?status=new' },
    { label: 'Downloads', value: downloadCount || 0, href: '/admin/dashboard/analytics' },
    { label: 'Subscribers', value: subscriberCount || 0, href: '/admin/dashboard/subscriptions' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-normal mb-2 text-text-main">Dashboard</h2>
        <p className="text-text-muted">Overview of your Gravitas Index performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="p-6 hover:border-accent transition-colors cursor-pointer">
              <p className="text-text-muted text-sm mb-2">{stat.label}</p>
              <p className="font-serif text-4xl text-text-main">{stat.value}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-serif text-xl mb-4 text-text-main">Recent Leads</h3>
          {recentLeads && recentLeads.length > 0 ? (
            <div className="space-y-4">
              {recentLeads.map((lead: any) => (
                <Link
                  key={lead.id}
                  href={`/admin/dashboard/leads/${lead.id}`}
                  className="block p-4 bg-bg border border-border rounded hover:border-accent transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-text-main">{lead.name}</p>
                      <p className="text-sm text-text-muted">{lead.email}</p>
                      <p className="text-sm text-text-muted mt-1">{lead.market} • {lead.role}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      lead.status === 'new' ? 'bg-accent/20 text-accent' :
                      lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                      lead.status === 'qualified' ? 'bg-green-500/20 text-green-400' :
                      lead.status === 'converted' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-border text-text-muted'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-center py-8">No leads yet</p>
          )}
          <Link
            href="/admin/dashboard/leads"
            className="block mt-4 text-accent hover:underline text-sm"
          >
            View all leads →
          </Link>
        </Card>

        <Card className="p-6">
          <h3 className="font-serif text-xl mb-4 text-text-main">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              href="/admin/dashboard/leads"
              className="block p-4 bg-bg border border-border rounded hover:border-accent transition-colors"
            >
              <p className="font-medium text-text-main">Manage Leads</p>
              <p className="text-sm text-text-muted">View and update lead statuses</p>
            </Link>
            <Link
              href="/admin/dashboard/analytics"
              className="block p-4 bg-bg border border-border rounded hover:border-accent transition-colors"
            >
              <p className="font-medium text-text-main">View Analytics</p>
              <p className="text-sm text-text-muted">Track conversion funnels and performance</p>
            </Link>
            <Link
              href="/admin/dashboard/content"
              className="block p-4 bg-bg border border-border rounded hover:border-accent transition-colors"
            >
              <p className="font-medium text-text-main">Edit Content</p>
              <p className="text-sm text-text-muted">Update FAQs and spot counts</p>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
