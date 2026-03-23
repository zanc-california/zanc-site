-- ZANC Site — Supabase schema (frontend-only architecture)
-- Run this in Supabase SQL Editor or via supabase db push

-- News/updates
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery images
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  caption TEXT,
  category TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admin users (references Supabase Auth; add UUIDs after creating users in Auth)
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: News — public read published, admins full access
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published news" ON news;
CREATE POLICY "Public can read published news"
  ON news FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Admins can do everything with news" ON news;
CREATE POLICY "Admins can do everything with news"
  ON news FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

-- RLS: Gallery — public read, admins full access
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
CREATE POLICY "Public can read gallery"
  ON gallery FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can do everything with gallery" ON gallery;
CREATE POLICY "Admins can do everything with gallery"
  ON gallery FOR ALL
  USING (auth.uid() IN (SELECT id FROM admins));

-- Admins table: no self-referential policies (avoid recursion on SELECT)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can read admins" ON admins;
CREATE POLICY "Admins can read admins"
  ON admins FOR SELECT
  USING (auth.uid() = id OR auth.role() = 'service_role');

-- First admin: create user in Supabase Auth, then run in SQL Editor (as project owner):
--   INSERT INTO admins (id) VALUES ('auth-users-uuid-here');
-- Managing additional admins is intended via service role / SQL editor.
DROP POLICY IF EXISTS "Admins can insert admins" ON admins;
CREATE POLICY "Admins can insert admins"
  ON admins FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
