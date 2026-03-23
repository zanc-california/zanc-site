-- Fix recursive RLS policies on admins table.
-- Run this in Supabase SQL Editor if 001_initial_schema.sql has already been applied.

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read admins" ON admins;
CREATE POLICY "Admins can read admins"
  ON admins FOR SELECT
  USING (auth.uid() = id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins can insert admins" ON admins;
CREATE POLICY "Admins can insert admins"
  ON admins FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
