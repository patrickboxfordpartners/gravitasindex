import { getSupabaseAdmin } from '@/lib/supabase/client';

export type SequenceType =
  | 'welcome'
  | 'lead_magnet'
  | 'follow_up_day1'
  | 'follow_up_day3'
  | 'follow_up_day7';

interface ScheduleSequenceParams {
  leadId: string;
  sequenceType: SequenceType;
  delayMinutes?: number;
}

/**
 * Schedule an email to be sent at a specific time
 */
export async function scheduleEmail({
  leadId,
  sequenceType,
  delayMinutes = 0,
}: ScheduleSequenceParams) {
  const scheduledFor = new Date();
  scheduledFor.setMinutes(scheduledFor.getMinutes() + delayMinutes);

  const { data, error } = await getSupabaseAdmin()
    .from('email_sequences')
    .insert({
      lead_id: leadId,
      sequence_type: sequenceType,
      status: 'pending',
      scheduled_for: scheduledFor.toISOString(),
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error scheduling email:', error);
    throw error;
  }

  return data;
}

/**
 * Schedule a complete email sequence for a new lead
 */
export async function scheduleLeadSequence(leadId: string) {
  try {
    // Welcome email - immediate
    await scheduleEmail({
      leadId,
      sequenceType: 'welcome',
      delayMinutes: 0,
    });

    // Follow-up Day 1 - 24 hours later
    await scheduleEmail({
      leadId,
      sequenceType: 'follow_up_day1',
      delayMinutes: 24 * 60,
    });

    // Follow-up Day 3 - 72 hours later
    await scheduleEmail({
      leadId,
      sequenceType: 'follow_up_day3',
      delayMinutes: 72 * 60,
    });

    // Follow-up Day 7 - 168 hours later
    await scheduleEmail({
      leadId,
      sequenceType: 'follow_up_day7',
      delayMinutes: 168 * 60,
    });

    return { success: true };
  } catch (error) {
    console.error('Error scheduling lead sequence:', error);
    throw error;
  }
}

/**
 * Schedule lead magnet email sequence
 */
export async function scheduleLeadMagnetSequence(leadId: string) {
  try {
    // Lead magnet delivery - immediate
    await scheduleEmail({
      leadId,
      sequenceType: 'lead_magnet',
      delayMinutes: 0,
    });

    // Follow-up Day 3 - 72 hours later
    await scheduleEmail({
      leadId,
      sequenceType: 'follow_up_day3',
      delayMinutes: 72 * 60,
    });

    // Follow-up Day 7 - 168 hours later
    await scheduleEmail({
      leadId,
      sequenceType: 'follow_up_day7',
      delayMinutes: 168 * 60,
    });

    return { success: true };
  } catch (error) {
    console.error('Error scheduling lead magnet sequence:', error);
    throw error;
  }
}

/**
 * Mark an email as sent
 */
export async function markEmailAsSent(emailId: string) {
  const { error } = await getSupabaseAdmin()
    .from('email_sequences')
    .update({
      status: 'sent',
      sent_at: new Date().toISOString(),
    })
    .eq('id', emailId);

  if (error) {
    console.error('Error marking email as sent:', error);
    throw error;
  }
}

/**
 * Mark an email as failed
 */
export async function markEmailAsFailed(emailId: string, errorMessage?: string) {
  const { error } = await getSupabaseAdmin()
    .from('email_sequences')
    .update({
      status: 'failed',
      metadata: { error: errorMessage },
    })
    .eq('id', emailId);

  if (error) {
    console.error('Error marking email as failed:', error);
  }
}
