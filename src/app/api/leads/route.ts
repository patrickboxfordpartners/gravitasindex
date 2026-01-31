import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { leadSchema } from '@/lib/validations/lead';
import { sendSequenceEmail } from '@/lib/email/send';
import { scheduleLeadSequence } from '@/lib/email/sequences';
import { rateLimit, getClientIdentifier, RATE_LIMITS } from '@/app/api/rate-limit';
import { z } from 'zod';

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
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validated = leadSchema.parse(body);

    // Insert lead into Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: validated.name,
        email: validated.email,
        market: validated.market,
        role: validated.role || null,
        pain: validated.pain || null,
        status: 'new',
        source: 'alpha_form',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit lead. Please try again.' },
        { status: 500 }
      );
    }

    // Send welcome email immediately
    try {
      await sendSequenceEmail({
        to: validated.email,
        name: validated.name,
        sequenceType: 'welcome',
      });
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
      // Don't fail the request if email fails
    }

    // Schedule email sequence
    try {
      await scheduleLeadSequence(data.id);
    } catch (sequenceError) {
      console.error('Error scheduling email sequence:', sequenceError);
      // Don't fail the request if scheduling fails
    }

    // TODO: Track analytics event (Phase 6)

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      leadId: data.id,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
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
