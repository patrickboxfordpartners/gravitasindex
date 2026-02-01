'use client';

import { useState, useEffect } from 'react';
import { createClientSupabaseClient } from '@/lib/supabase/client-auth';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

type Lead = {
  id: string;
  name: string;
  email: string;
  market: string;
  role: string;
  status: string;
  pain: string;
  source: string;
  created_at: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    try {
      const supabase = createClientSupabaseClient();
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  }

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.market.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesRole = roleFilter === 'all' || lead.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Get unique roles for filter
  const uniqueRoles = Array.from(new Set(leads.map((lead) => lead.role)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-serif text-3xl font-normal mb-2 text-text-main">Leads</h2>
          <p className="text-text-muted">
            {filteredLeads.length} of {leads.length} leads
          </p>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or market..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-bg border border-border px-4 py-2 rounded text-text-main placeholder-text-muted focus:outline-none focus:border-accent"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-bg border border-border px-4 py-2 rounded text-text-main focus:outline-none focus:border-accent"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-bg border border-border px-4 py-2 rounded text-text-main focus:outline-none focus:border-accent"
          >
            <option value="all">All Roles</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto"></div>
            <p className="text-text-muted mt-4">Loading leads...</p>
          </div>
        ) : filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Market</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Source</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-muted">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border hover:bg-bg transition-colors">
                    <td className="py-4 px-4 text-text-main">{lead.name}</td>
                    <td className="py-4 px-4 text-text-muted text-sm">{lead.email}</td>
                    <td className="py-4 px-4 text-text-main">{lead.market}</td>
                    <td className="py-4 px-4 text-text-muted text-sm">{lead.role}</td>
                    <td className="py-4 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        lead.status === 'new' ? 'bg-accent/20 text-accent' :
                        lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                        lead.status === 'qualified' ? 'bg-green-500/20 text-green-400' :
                        lead.status === 'converted' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-border text-text-muted'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-text-muted text-sm">{lead.source}</td>
                    <td className="py-4 px-4 text-text-muted text-sm">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        href={`/admin/dashboard/leads/${lead.id}`}
                        className="text-accent hover:underline text-sm"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-muted">No leads found matching your filters</p>
          </div>
        )}
      </Card>
    </div>
  );
}
