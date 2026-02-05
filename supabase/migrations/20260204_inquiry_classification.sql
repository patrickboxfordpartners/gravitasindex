-- INQUIRY CLASSIFICATION SYSTEM
-- Adds AI-powered lead classification and triage capabilities

-- ============================================================================
-- ADD CLASSIFICATION FIELDS TO LEADS TABLE
-- ============================================================================

ALTER TABLE leads
ADD COLUMN IF NOT EXISTS classification TEXT
  CHECK (classification IN ('opportunity', 'noise', 'risk', 'reputation'));

ALTER TABLE leads
ADD COLUMN IF NOT EXISTS recommended_action TEXT;

ALTER TABLE leads
ADD COLUMN IF NOT EXISTS signals JSONB DEFAULT '{}'::jsonb;

ALTER TABLE leads
ADD COLUMN IF NOT EXISTS rationale TEXT;

ALTER TABLE leads
ADD COLUMN IF NOT EXISTS classification_timestamp TIMESTAMP WITH TIME ZONE;

-- Add index for faster classification filtering
CREATE INDEX IF NOT EXISTS leads_classification_idx ON leads(classification);

-- ============================================================================
-- CLASSIFICATION TIMELINE TABLE
-- ============================================================================
-- Track the journey of each inquiry through classification

CREATE TABLE IF NOT EXISTS classification_timeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  event TEXT NOT NULL, -- e.g., "Inquiry received", "Classified as Opportunity", "Routed to sales"
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS classification_timeline_lead_id_idx ON classification_timeline(lead_id);
CREATE INDEX IF NOT EXISTS classification_timeline_timestamp_idx ON classification_timeline(timestamp DESC);

-- ============================================================================
-- RLS POLICIES FOR NEW TABLE
-- ============================================================================

ALTER TABLE classification_timeline ENABLE ROW LEVEL SECURITY;

-- System can insert timeline events
CREATE POLICY "System can insert timeline events" ON classification_timeline
  FOR INSERT WITH CHECK (true);

-- Admins can view timeline
CREATE POLICY "Admins can view timeline" ON classification_timeline
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================================
-- HELPER FUNCTION: ADD TIMELINE EVENT
-- ============================================================================

CREATE OR REPLACE FUNCTION add_classification_timeline_event(
  p_lead_id UUID,
  p_event TEXT,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
DECLARE
  v_event_id UUID;
BEGIN
  INSERT INTO classification_timeline (lead_id, event, metadata)
  VALUES (p_lead_id, p_event, p_metadata)
  RETURNING id INTO v_event_id;

  RETURN v_event_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGER: AUTO-ADD TIMELINE EVENT ON CLASSIFICATION
-- ============================================================================

CREATE OR REPLACE FUNCTION track_classification_change()
RETURNS TRIGGER AS $$
BEGIN
  -- If classification was just set (from NULL to something)
  IF OLD.classification IS NULL AND NEW.classification IS NOT NULL THEN
    PERFORM add_classification_timeline_event(
      NEW.id,
      'Classified as ' || initcap(NEW.classification),
      jsonb_build_object(
        'classification', NEW.classification,
        'recommended_action', NEW.recommended_action
      )
    );
  END IF;

  -- If classification changed
  IF OLD.classification IS NOT NULL AND NEW.classification IS NOT NULL
     AND OLD.classification != NEW.classification THEN
    PERFORM add_classification_timeline_event(
      NEW.id,
      'Reclassified from ' || initcap(OLD.classification) || ' to ' || initcap(NEW.classification),
      jsonb_build_object(
        'old_classification', OLD.classification,
        'new_classification', NEW.classification
      )
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_lead_classification
  AFTER UPDATE ON leads
  FOR EACH ROW
  WHEN (OLD.classification IS DISTINCT FROM NEW.classification)
  EXECUTE FUNCTION track_classification_change();

-- ============================================================================
-- INITIAL TIMELINE EVENTS FOR EXISTING LEADS
-- ============================================================================
-- Add "Inquiry received" event for all existing leads that don't have timeline entries

INSERT INTO classification_timeline (lead_id, event, timestamp)
SELECT
  l.id,
  'Inquiry received',
  l.created_at
FROM leads l
WHERE NOT EXISTS (
  SELECT 1 FROM classification_timeline ct
  WHERE ct.lead_id = l.id AND ct.event = 'Inquiry received'
);
