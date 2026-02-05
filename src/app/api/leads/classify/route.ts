import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Classification = 'opportunity' | 'noise' | 'risk' | 'reputation';

interface ClassificationResult {
  classification: Classification;
  recommended_action: string;
  signals: {
    timelineClarity: string;
    locationSpecificity: string;
    propertyClarity: string;
    readinessIndicators: string[];
    riskTriggers: string[];
  };
  rationale: string;
}

/**
 * Classify a lead inquiry using AI or rule-based logic
 */
async function classifyInquiry(
  name: string,
  email: string,
  market: string,
  role: string,
  pain: string
): Promise<ClassificationResult> {
  const fullText = `${pain || ''} ${role || ''} ${market || ''}`.toLowerCase();

  // Initialize signals
  const signals = {
    timelineClarity: '',
    locationSpecificity: market || 'Not specified',
    propertyClarity: '',
    readinessIndicators: [] as string[],
    riskTriggers: [] as string[],
  };

  // RISK DETECTION (highest priority)
  const riskKeywords = [
    'lawsuit', 'legal', 'attorney', 'dispute', 'fraud', 'complaint',
    'scam', 'threatened', 'threatening', 'sue', 'suing', 'court',
    'lawyer', 'illegal', 'violation', 'breach', 'compliance'
  ];

  const hasRiskTrigger = riskKeywords.some(keyword => fullText.includes(keyword));

  if (hasRiskTrigger) {
    signals.riskTriggers = riskKeywords.filter(k => fullText.includes(k));
    return {
      classification: 'risk',
      recommended_action: 'Escalate to compliance team immediately',
      signals: {
        ...signals,
        timelineClarity: 'Urgent - immediate attention required',
      },
      rationale: 'Legal/compliance matter detected. Potential liability exposure requiring immediate escalation to reduce risk.'
    };
  }

  // REPUTATION DETECTION
  const reputationKeywords = [
    'review', 'testimonial', 'feedback', 'referral', 'recommend',
    'excellent experience', 'great service', 'thank you', 'appreciation',
    'satisfied', 'happy with', 'exceeded expectations'
  ];

  const hasReputationSignal = reputationKeywords.some(k => fullText.includes(k));

  if (hasReputationSignal) {
    signals.readinessIndicators.push('Positive sentiment expressed');

    if (fullText.includes('review') || fullText.includes('testimonial')) {
      signals.readinessIndicators.push('Review intent');
    }
    if (fullText.includes('refer') || fullText.includes('recommend')) {
      signals.readinessIndicators.push('Referral intent');
    }

    return {
      classification: 'reputation',
      recommended_action: 'Send review request + referral form',
      signals,
      rationale: 'Satisfied client offering reputation boost through review or referrals. High-value engagement opportunity to capture testimonial and potential new leads.'
    };
  }

  // OPPORTUNITY vs NOISE DETECTION

  // Timeline signals
  const urgentTimeline = ['asap', 'urgent', 'immediately', 'this week', 'this month', 'need to move'];
  const clearTimeline = ['next month', 'by march', 'by april', 'q1', 'q2', 'spring', 'summer'];
  const vagueTimeline = ['someday', 'eventually', 'maybe', 'thinking about', 'just browsing', 'not sure'];

  if (urgentTimeline.some(k => fullText.includes(k))) {
    signals.timelineClarity = 'Urgent timeline indicated';
    signals.readinessIndicators.push('Time-sensitive requirement');
  } else if (clearTimeline.some(k => fullText.includes(k))) {
    signals.timelineClarity = 'Clear timeline provided';
    signals.readinessIndicators.push('Defined timeline');
  } else if (vagueTimeline.some(k => fullText.includes(k))) {
    signals.timelineClarity = 'Vague or no timeline';
  }

  // Readiness signals (opportunity indicators)
  const readinessSignals = [
    { keyword: 'preapproved', label: 'Preapproved for financing' },
    { keyword: 'pre-approved', label: 'Preapproved for financing' },
    { keyword: 'cash buyer', label: 'Cash buyer' },
    { keyword: 'ready to buy', label: 'Stated readiness to purchase' },
    { keyword: 'looking to purchase', label: 'Active purchase intent' },
    { keyword: 'need to sell', label: 'Active selling intent' },
    { keyword: 'specific budget', label: 'Budget defined' },
    { keyword: 'budget of', label: 'Budget defined' },
    { keyword: '$', label: 'Budget mentioned' },
    { keyword: 'beds', label: 'Specific property requirements' },
    { keyword: 'bedroom', label: 'Specific property requirements' },
    { keyword: 'square feet', label: 'Specific property requirements' },
    { keyword: 'sq ft', label: 'Specific property requirements' },
  ];

  readinessSignals.forEach(({ keyword, label }) => {
    if (fullText.includes(keyword) && !signals.readinessIndicators.includes(label)) {
      signals.readinessIndicators.push(label);
    }
  });

  // Property clarity
  if (fullText.match(/\d+\s*(bed|br|bedroom)/i)) {
    signals.propertyClarity = 'Specific bedroom count mentioned';
  } else if (fullText.includes('commercial') || fullText.includes('office') || fullText.includes('retail')) {
    signals.propertyClarity = 'Commercial property specified';
  } else if (fullText.includes('land') || fullText.includes('lot')) {
    signals.propertyClarity = 'Land/lot specified';
  } else {
    signals.propertyClarity = 'Property type not clearly specified';
  }

  // Noise indicators
  const noiseIndicators = [
    'just looking', 'just browsing', 'curious', 'information only',
    'what are your fees', 'how much', 'rates', 'not ready',
    'not sure', 'might', 'could', 'would you', 'do you have'
  ];

  const hasNoiseSignal = noiseIndicators.some(k => fullText.includes(k));

  // CLASSIFICATION LOGIC
  const hasStrongReadiness = signals.readinessIndicators.length >= 2;
  const hasTimeline = signals.timelineClarity !== '' && !signals.timelineClarity.includes('Vague');
  const hasPropertyClarity = signals.propertyClarity !== '' && !signals.propertyClarity.includes('not clearly');

  // OPPORTUNITY: Strong signals, clear intent
  if (hasStrongReadiness && hasTimeline) {
    return {
      classification: 'opportunity',
      recommended_action: 'Route to sales team immediately - high-intent lead',
      signals,
      rationale: `Qualified lead with ${signals.readinessIndicators.length} readiness indicators and clear timeline. High probability of conversion. Immediate follow-up recommended.`
    };
  }

  // OPPORTUNITY: Moderate signals
  if ((hasStrongReadiness || hasTimeline) && hasPropertyClarity) {
    return {
      classification: 'opportunity',
      recommended_action: 'Route to sales team for qualification call',
      signals,
      rationale: 'Lead shows definite intent with some readiness signals. Worth sales team attention for qualification and nurturing.'
    };
  }

  // NOISE: Clear low-intent signals
  if (hasNoiseSignal || (!hasTimeline && signals.readinessIndicators.length === 0)) {
    return {
      classification: 'noise',
      recommended_action: 'Add to long-term nurture sequence',
      signals,
      rationale: 'Early-stage browser with no clear intent or timeline. Automated nurture sequence appropriate to maintain engagement without immediate sales resource allocation.'
    };
  }

  // DEFAULT: NOISE (benefit of the doubt to sales team resources)
  return {
    classification: 'noise',
    recommended_action: 'Add to general nurture sequence',
    signals,
    rationale: 'Insufficient signals to determine clear intent. Add to nurture sequence for future engagement opportunities.'
  };
}

/**
 * POST /api/leads/classify
 * Classify a specific lead or all unclassified leads
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lead_id, classify_all } = body;

    if (classify_all) {
      // Classify all unclassified leads
      const { data: leads, error: fetchError } = await supabase
        .from('leads')
        .select('*')
        .is('classification', null);

      if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
      }

      const results = [];

      for (const lead of leads || []) {
        const classification = await classifyInquiry(
          lead.name,
          lead.email,
          lead.market,
          lead.role,
          lead.pain
        );

        const { error: updateError } = await supabase
          .from('leads')
          .update({
            classification: classification.classification,
            recommended_action: classification.recommended_action,
            signals: classification.signals,
            rationale: classification.rationale,
            classification_timestamp: new Date().toISOString(),
          })
          .eq('id', lead.id);

        if (updateError) {
          console.error(`Error updating lead ${lead.id}:`, updateError);
        } else {
          results.push({ lead_id: lead.id, classification: classification.classification });
        }
      }

      return NextResponse.json({
        success: true,
        classified_count: results.length,
        results,
      });
    }

    // Classify single lead
    if (!lead_id) {
      return NextResponse.json({ error: 'lead_id required' }, { status: 400 });
    }

    // Fetch lead
    const { data: lead, error: fetchError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', lead_id)
      .single();

    if (fetchError || !lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Classify
    const classification = await classifyInquiry(
      lead.name,
      lead.email,
      lead.market,
      lead.role,
      lead.pain
    );

    // Update lead
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        classification: classification.classification,
        recommended_action: classification.recommended_action,
        signals: classification.signals,
        rationale: classification.rationale,
        classification_timestamp: new Date().toISOString(),
      })
      .eq('id', lead_id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      lead_id,
      classification,
    });
  } catch (error: any) {
    console.error('Classification error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
