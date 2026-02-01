import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase/client';
import { sendSequenceEmail } from '@/lib/email/send';
import { scheduleLeadMagnetSequence } from '@/lib/email/sequences';
import { rateLimit, getClientIdentifier, RATE_LIMITS } from '@/app/api/rate-limit';
import { z } from 'zod';

const leadMagnetSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(request);
    const rateLimitResult = rateLimit(identifier, RATE_LIMITS.moderate);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validated = leadMagnetSchema.parse(body);

    // Check if lead already exists
    const { data: existingLead } = await getSupabase()
      .from('leads')
      .select('id')
      .eq('email', validated.email)
      .single();

    let leadId = existingLead?.id;

    // If no existing lead, create one
    if (!leadId) {
      const { data: newLead, error: leadError } = await getSupabase()
        .from('leads')
        .insert({
          name: validated.name,
          email: validated.email,
          market: 'Unknown', // Required field, but not collected in lead magnet
          status: 'new',
          source: 'lead_magnet',
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (leadError) {
        console.error('Supabase error creating lead:', leadError);
        return NextResponse.json(
          { error: 'Failed to process request. Please try again.' },
          { status: 500 }
        );
      }

      leadId = newLead.id;
    }

    // Record the download
    const { error: downloadError } = await getSupabase()
      .from('lead_magnet_downloads')
      .insert({
        lead_id: leadId,
        email: validated.email,
        name: validated.name,
        magnet_type: 'entity_playbook',
        downloaded_at: new Date().toISOString(),
      });

    if (downloadError) {
      console.error('Supabase error recording download:', downloadError);
      // Don't fail the request, just log the error
    }

    // Send email with download link
    const downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://gravitasindex.com'}/lead-magnets/entity-search-playbook.pdf`;

    try {
      await sendSequenceEmail({
        to: validated.email,
        name: validated.name,
        sequenceType: 'lead_magnet',
        downloadUrl,
      });
    } catch (emailError) {
      console.error('Error sending lead magnet email:', emailError);
      // Don't fail the request if email fails
    }

    // Schedule follow-up sequence
    try {
      await scheduleLeadMagnetSequence(leadId);
    } catch (sequenceError) {
      console.error('Error scheduling email sequence:', sequenceError);
      // Don't fail the request if scheduling fails
    }

    // Track analytics event
    const { error: analyticsError } = await getSupabase()
      .from('analytics_events')
      .insert({
        event_name: 'lead_magnet_downloaded',
        lead_id: leadId,
        properties: {
          magnet_type: 'entity_playbook',
          email: validated.email,
        },
        created_at: new Date().toISOString(),
      });

    if (analyticsError) {
      console.error('Analytics tracking error:', analyticsError);
      // Don't fail the request
    }

    return NextResponse.json({
      success: true,
      message: 'Download link sent to your email!',
      downloadUrl,
      leadId,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
