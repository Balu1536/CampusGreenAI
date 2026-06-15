-- CampusGreen AI — Supabase / PostgreSQL Schema
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL,
  institution_name TEXT,
  overall_score INTEGER NOT NULL CHECK (overall_score BETWEEN 0 AND 100),
  grade TEXT NOT NULL,
  grade_description TEXT,
  answers JSONB NOT NULL,
  category_scores JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID REFERENCES assessments(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  categories JSONB NOT NULL,
  prompt_used TEXT,
  source TEXT DEFAULT 'rule-based',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assessments_institution ON assessments(institution_id);
CREATE INDEX IF NOT EXISTS idx_assessments_created ON assessments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recommendations_assessment ON recommendations(assessment_id);

-- Row Level Security (enable in Supabase dashboard)
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Public read for anonymized benchmarking (optional — customize per deployment)
-- CREATE POLICY "Allow public read" ON assessments FOR SELECT USING (true);

COMMENT ON TABLE assessments IS 'Stores CampusGreen sustainability assessment results. No PII required.';
COMMENT ON COLUMN assessments.answers IS 'Map of question_id -> yes|partial|no';
