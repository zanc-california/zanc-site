# ZANC email subscribe (Resend + Supabase)

## 1. Supabase

Run `supabase/email_subscribers.sql` in the Supabase SQL Editor to create `email_subscribers` (`id`, `email` unique, `created_at`).

## 2. Environment variables

Copy `.env.example` → `.env.local` (never commit secrets).

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key |
| `SUPABASE_URL` | Same project URL as `VITE_SUPABASE_URL` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** — from Supabase Settings → API |
| `RESEND_FROM` | e.g. `ZANC <hello@updates.zancsac.com>` (verified domain) |
| `ZANC_SUBSCRIBE_ADMIN_EMAIL` | Receives “New ZANC subscriber” notifications |

Optional: `VITE_SUBSCRIBE_API_URL` if the form should call a different base URL.

## 3. Local dev

`npm run dev` — Vite serves **`POST /api/subscribe`** via middleware (same logic as production) when the variables above are in `.env.local`.

Restart the dev server after changing env.

## 4. Vercel

Add the same env vars in the Vercel project (Production + Preview).  
Deploy with **Root Directory** = `frontend` so `api/subscribe.ts` is picked up as a serverless function.

## 5. UI

- Footer: **ZANC updates** subscribe form (`SubscribeForm`).
- Reuse `<SubscribeForm variant="inline" />` on Home or Community later.

## Troubleshooting

- **Resend**: domain + “from” must be verified; check free-tier limits.
- **Duplicates**: handled gracefully — user sees a friendly “already subscribed” message.
- **403/401 from Supabase**: wrong service role key or RLS policy blocking service role (service role should bypass RLS).
