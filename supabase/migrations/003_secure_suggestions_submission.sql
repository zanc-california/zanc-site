-- Move public community suggestion writes behind the Vercel API.
-- Run this in Supabase SQL Editor if suggestions were previously open to anonymous inserts.

ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert suggestions" ON suggestions;

CREATE POLICY "Service role can insert suggestions"
  ON suggestions FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
