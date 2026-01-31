'use client';

import { useState, useEffect } from 'react';
import { createClientSupabaseClient } from '@/lib/supabase/client-auth';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TextArea } from '@/components/ui/TextArea';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

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
  updated_at: string;
};

type EmailSequence = {
  id: string;
  sequence_type: string;
  status: string;
  scheduled_for: string;
  sent_at: string | null;
};

type Note = {
  id: string;
  note: string;
  created_at: string;
};

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [emailSequences, setEmailSequences] = useState<EmailSequence[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const supabase = createClientSupabaseClient();

  useEffect(() => {
    fetchLeadData();
  }, [leadId]);

  async function fetchLeadData() {
    setLoading(true);
    try {
      // Fetch lead
      const { data: leadData, error: leadError } = await supabase
        .from('leads')
        .select('*')
        .eq('id', leadId)
        .single();

      if (leadError) throw leadError;
      setLead(leadData);

      // Fetch email sequences
      const { data: sequencesData } = await supabase
        .from('email_sequences')
        .select('*')
        .eq('lead_id', leadId)
        .order('scheduled_for', { ascending: true });

      setEmailSequences(sequencesData || []);

      // Fetch notes
      const { data: notesData } = await supabase
        .from('admin_notes')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });

      setNotes(notesData || []);
    } catch (error) {
      console.error('Error fetching lead data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(newStatus: string) {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;

      setLead((prev) => prev ? { ...prev, status: newStatus } : null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  }

  async function addNote() {
    if (!newNote.trim()) return;

    try {
      const { error } = await supabase
        .from('admin_notes')
        .insert({
          lead_id: leadId,
          note: newNote,
          created_at: new Date().toISOString(),
        });

      if (error) throw error;

      setNewNote('');
      fetchLeadData(); // Refresh notes
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note');
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto"></div>
        <p className="text-text-muted mt-4">Loading lead...</p>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Lead not found</p>
        <Link href="/admin/dashboard/leads" className="text-accent hover:underline mt-4 block">
          ← Back to leads
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/dashboard/leads"
            className="text-accent hover:underline text-sm mb-2 inline-block"
          >
            ← Back to leads
          </Link>
          <h2 className="font-serif text-3xl font-normal text-text-main">{lead.name}</h2>
          <p className="text-text-muted">{lead.email}</p>
        </div>
        <a
          href={`mailto:${lead.email}`}
          className="bg-accent hover:bg-accent/80 text-bg px-6 py-2 rounded font-medium transition-colors"
        >
          Send Email
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-serif text-xl mb-4 text-text-main">Lead Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text-muted mb-1">Market</p>
                <p className="text-text-main">{lead.market}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1">Role</p>
                <p className="text-text-main">{lead.role}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1">Source</p>
                <p className="text-text-main">{lead.source}</p>
              </div>
              <div>
                <p className="text-sm text-text-muted mb-1">Created</p>
                <p className="text-text-main">
                  {new Date(lead.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-text-muted mb-1">Pain Point</p>
                <p className="text-text-main">{lead.pain}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-serif text-xl mb-4 text-text-main">Email Sequences</h3>
            {emailSequences.length > 0 ? (
              <div className="space-y-3">
                {emailSequences.map((seq) => (
                  <div key={seq.id} className="flex items-center justify-between p-4 bg-bg border border-border rounded">
                    <div>
                      <p className="font-medium text-text-main">
                        {seq.sequence_type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </p>
                      <p className="text-sm text-text-muted">
                        {seq.sent_at
                          ? `Sent ${new Date(seq.sent_at).toLocaleString()}`
                          : `Scheduled for ${new Date(seq.scheduled_for).toLocaleString()}`}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      seq.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                      seq.status === 'pending' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {seq.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-muted text-center py-8">No email sequences scheduled</p>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="font-serif text-xl mb-4 text-text-main">Notes</h3>
            <div className="space-y-4 mb-6">
              {notes.map((note) => (
                <div key={note.id} className="p-4 bg-bg border border-border rounded">
                  <p className="text-text-main mb-2">{note.note}</p>
                  <p className="text-xs text-text-muted">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
              {notes.length === 0 && (
                <p className="text-text-muted text-center py-4">No notes yet</p>
              )}
            </div>
            <div className="space-y-3">
              <TextArea
                label="Add Note"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note about this lead..."
                rows={3}
              />
              <Button onClick={addNote} variant="accent" disabled={!newNote.trim()}>
                Add Note
              </Button>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h3 className="font-serif text-xl mb-4 text-text-main">Status</h3>
            <div className="space-y-2">
              {['new', 'contacted', 'qualified', 'converted', 'lost'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  disabled={updating || lead.status === status}
                  className={`w-full px-4 py-3 rounded text-left transition-colors ${
                    lead.status === status
                      ? 'bg-accent/20 text-accent border-2 border-accent'
                      : 'bg-bg border border-border text-text-main hover:border-accent'
                  } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="font-medium capitalize">{status}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
