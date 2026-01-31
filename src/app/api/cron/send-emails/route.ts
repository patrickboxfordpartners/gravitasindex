import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { resend } from '@/lib/email/resend';
import { render } from '@react-email/components';
import { FollowUpEmail } from '../../../../../emails/FollowUpEmail';

/**
 * Vercel Cron Job for sending scheduled emails
 * Configure in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/send-emails",
 *     "schedule": "*/5 * * * *"
 *   }]
 * }
 */

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date().toISOString();

    // Get pending emails that are scheduled to be sent
    const { data: pendingEmails, error: fetchError } = await supabaseAdmin
      .from('email_sequences')
      .select('*, leads(name, email)')
      .eq('status', 'pending')
      .lte('scheduled_for', now)
      .limit(50); // Process 50 at a time to avoid timeouts

    if (fetchError) {
      console.error('Error fetching pending emails:', fetchError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!pendingEmails || pendingEmails.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No pending emails to send',
        sent: 0,
      });
    }

    const results = {
      sent: 0,
      failed: 0,
      errors: [] as string[],
    };

    // Process each email
    for (const email of pendingEmails) {
      try {
        const lead = email.leads as any;

        if (!lead || !lead.email) {
          throw new Error('Lead email not found');
        }

        // Determine email content based on sequence type
        let emailSubject = '';
        let emailHtml = '';

        switch (email.sequence_type) {
          case 'follow_up_day1':
            emailSubject = 'The Entity Search Shift: What Happens Next';
            emailHtml = render(
              FollowUpEmail({ name: lead.name, dayNumber: 1 })
            );
            break;

          case 'follow_up_day3':
            emailSubject = 'How Denver Agents Captured 47% More Leads';
            emailHtml = render(
              FollowUpEmail({ name: lead.name, dayNumber: 3 })
            );
            break;

          case 'follow_up_day7':
            emailSubject = 'Last Call: Your Market Is Filling Up';
            emailHtml = render(
              FollowUpEmail({ name: lead.name, dayNumber: 7 })
            );
            break;

          default:
            throw new Error(`Unknown sequence type: ${email.sequence_type}`);
        }

        // Send email via Resend
        await resend.emails.send({
          from: 'GRAVITAS INDEX <hello@gravitasindex.com>',
          to: lead.email,
          subject: emailSubject,
          html: emailHtml,
        });

        // Update email status to sent
        await supabaseAdmin
          .from('email_sequences')
          .update({
            status: 'sent',
            sent_at: new Date().toISOString(),
          })
          .eq('id', email.id);

        results.sent++;
      } catch (error) {
        console.error(`Error sending email ${email.id}:`, error);

        // Update email status to failed
        await supabaseAdmin
          .from('email_sequences')
          .update({
            status: 'failed',
          })
          .eq('id', email.id);

        results.failed++;
        results.errors.push(
          `Email ${email.id}: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${pendingEmails.length} emails`,
      sent: results.sent,
      failed: results.failed,
      errors: results.errors,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;
