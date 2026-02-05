# Inquiry Classification System

## Overview

The Inquiry Classification System automatically analyzes and triages incoming leads based on their content, urgency, and intent. This helps agents prioritize high-value opportunities and avoid wasting time on low-intent browsers.

## Classification Categories

### 1. **Opportunity** 🟢
High-intent leads with clear buying/selling signals
- **Indicators:**
  - Clear timeline (specific dates, urgency)
  - Financial readiness (preapproved, cash buyer, budget mentioned)
  - Specific property requirements (bedrooms, sq ft, location)
- **Recommended Actions:**
  - Route to sales team immediately
  - Schedule qualification call within 24 hours
  - Prioritize in CRM

### 2. **Noise** ⚪
Low-intent inquiries with vague or no timeline
- **Indicators:**
  - "Just browsing" or "just looking" language
  - No timeline or "eventually/someday"
  - Price shopping only ("what are your fees?")
  - No specific requirements
- **Recommended Actions:**
  - Add to long-term nurture sequence
  - Automated email drip campaign
  - No immediate sales team attention

### 3. **Risk** 🔴
Legal/compliance matters requiring immediate escalation
- **Indicators:**
  - Legal keywords (lawsuit, attorney, fraud, dispute)
  - Threats or threatening language
  - Compliance-sensitive matters
  - Property disputes
- **Recommended Actions:**
  - Escalate to compliance team immediately
  - Do NOT respond without legal review
  - Document all communications

### 4. **Reputation** 🔵
Satisfied clients offering reviews, referrals, or testimonials
- **Indicators:**
  - Positive sentiment ("excellent experience", "thank you")
  - Review intent explicitly stated
  - Referral offers
  - Appreciation for recent service
- **Recommended Actions:**
  - Send review request link immediately
  - Provide referral form
  - Thank and acknowledge
  - Add to case study candidates

## How Signals Are Detected

The system analyzes each inquiry for:

### Timeline Clarity
- **Urgent:** "asap", "immediately", "this week"
- **Clear:** "next month", "by March", "Q1"
- **Vague:** "someday", "maybe", "eventually"

### Readiness Indicators
- Financing: "preapproved", "cash buyer"
- Intent: "ready to buy", "need to sell"
- Budget: specific dollar amounts mentioned
- Requirements: bedroom count, sq ft, property type

### Risk Triggers
- Legal: "lawsuit", "attorney", "fraud", "illegal"
- Threats: "sue", "threatening", "legal action"
- Disputes: "boundary dispute", "compliance violation"

## Usage

### Automatic Classification
New leads are automatically classified when they come in through the API. The system:
1. Extracts signals from the inquiry text
2. Applies rule-based classification logic
3. Assigns a category with rationale
4. Logs timeline events
5. Suggests recommended action

### Manual Classification
Admins can manually classify or reclassify leads:
1. Go to **Admin Dashboard → Leads → [Lead Detail]**
2. Click **"Classify Lead"** button
3. System analyzes and displays results
4. Classification is saved and timeline updated

### Bulk Classification
To classify all unclassified leads:
```bash
POST /api/leads/classify
{
  "classify_all": true
}
```

## Database Schema

### New Fields on `leads` Table
- `classification` - opportunity | noise | risk | reputation
- `recommended_action` - Text suggestion for handling
- `signals` - JSONB with extracted signals
- `rationale` - Explanation for classification
- `classification_timestamp` - When classified

### New Table: `classification_timeline`
Tracks the journey of each inquiry:
- Event descriptions ("Classified as Opportunity")
- Timestamps
- Metadata (previous classification, etc.)

## API Endpoints

### Classify Single Lead
```bash
POST /api/leads/classify
{
  "lead_id": "uuid-here"
}
```

**Response:**
```json
{
  "success": true,
  "lead_id": "uuid",
  "classification": {
    "classification": "opportunity",
    "recommended_action": "Route to sales team immediately",
    "signals": {
      "timelineClarity": "Urgent timeline indicated",
      "locationSpecificity": "Downtown Chicago",
      "propertyClarity": "3-bedroom requirement",
      "readinessIndicators": ["Preapproved for financing", "Budget defined"],
      "riskTriggers": []
    },
    "rationale": "Qualified lead with 2 readiness indicators..."
  }
}
```

### Classify All Unclassified Leads
```bash
POST /api/leads/classify
{
  "classify_all": true
}
```

**Response:**
```json
{
  "success": true,
  "classified_count": 12,
  "results": [
    { "lead_id": "uuid1", "classification": "opportunity" },
    { "lead_id": "uuid2", "classification": "noise" }
  ]
}
```

## UI Components

### ClassificationBadge
Displays the classification with color coding:
```tsx
import { ClassificationBadge } from '@/components/ui/ClassificationBadge';

<ClassificationBadge classification="opportunity" size="sm" />
```

### Leads List Page
- Filter by classification
- Visual badges in table
- Quick identification of lead type

### Lead Detail Page
- Full classification analysis
- Signals breakdown
- Timeline of events
- Recommended action prominently displayed
- Manual classify button if unclassified

## Migration

To add the inquiry classification system to your Gravitas Index database:

```bash
# Run the migration in Supabase SQL Editor
supabase/migrations/20260204_inquiry_classification.sql
```

This will:
- Add classification fields to `leads` table
- Create `classification_timeline` table
- Set up RLS policies
- Create helper functions and triggers
- Backfill timeline events for existing leads

## Future Enhancements

- **AI-Powered Classification**: Integrate OpenAI/Claude for more nuanced analysis
- **Custom Rules**: Allow admins to define custom classification rules per market
- **Auto-Routing**: Automatically assign leads to team members based on classification
- **Webhooks**: Trigger external actions (Slack notifications, CRM updates) on classification
- **Learning**: Track classification accuracy and refine rules over time

## Support

For questions or issues with the classification system, check:
- Database logs: `classification_timeline` table
- API logs: `/api/leads/classify` endpoint
- Lead detail page: Full signal breakdown and rationale
