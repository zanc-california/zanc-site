-- Run in Supabase SQL Editor (once).
-- Table for public newsletter / updates signups (written only from server with service role).

create table if not exists public.email_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  constraint email_subscribers_email_unique unique (email)
);

create index if not exists email_subscribers_created_at_idx on public.email_subscribers (created_at desc);

alter table public.email_subscribers enable row level security;

-- No policies: only the service role (bypasses RLS) may insert/select from API routes.
-- Optional later: admin read policy for authenticated staff.

comment on table public.email_subscribers is 'Marketing / updates list; inserts via /api/subscribe with service role.';
