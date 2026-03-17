-- Copper & Redwood overhaul — community features
-- Run in Supabase SQL Editor to enable /community.

-- Community suggestions
CREATE TABLE IF NOT EXISTS suggestions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',        -- new, reviewed, actioned
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Opportunities board
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,           -- jobs, housing, scholarships, services, other
  description TEXT NOT NULL,
  location TEXT,
  link TEXT,                        -- external URL
  posted_by TEXT,                   -- admin name or "Community Member"
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;

-- Anyone can submit suggestions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'suggestions' AND policyname = 'Anyone can insert suggestions'
  ) THEN
    CREATE POLICY "Anyone can insert suggestions" ON suggestions
      FOR INSERT WITH CHECK (true);
  END IF;
END$$;

-- Only admins can read suggestions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'suggestions' AND policyname = 'Admins can read suggestions'
  ) THEN
    CREATE POLICY "Admins can read suggestions" ON suggestions
      FOR SELECT USING (auth.uid() IN (SELECT id FROM admins));
  END IF;
END$$;

-- Anyone can read active opportunities
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'opportunities' AND policyname = 'Public can read active opportunities'
  ) THEN
    CREATE POLICY "Public can read active opportunities" ON opportunities
      FOR SELECT USING (active = true);
  END IF;
END$$;

-- Only admins can manage opportunities
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'opportunities' AND policyname = 'Admins can manage opportunities'
  ) THEN
    CREATE POLICY "Admins can manage opportunities" ON opportunities
      FOR ALL USING (auth.uid() IN (SELECT id FROM admins));
  END IF;
END$$;

