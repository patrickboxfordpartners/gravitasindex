import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { leadSchema } from '@/lib/validations/lead';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
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

    // TODO: Send welcome email via Resend (Phase 4)
    // TODO: Schedule email sequence (Phase 4)
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
