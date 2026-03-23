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

### Required server env (not optional)

The subscribe API runs **only on the server**. These **must** exist in Vercel → Settings → Environment Variables (not just in `.env.local` on your laptop):

| Variable | Notes |
|----------|--------|
| `SUPABASE_URL` | Same project URL as `VITE_SUPABASE_URL` |
| `SUPABASE_SERVICE_ROLE_KEY` | **service_role** from Supabase → Settings → API (never the anon key, never `VITE_*`) |
| `RESEND_API_KEY` | Or welcome/admin emails won’t send (subscribe may still succeed) |

If `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` is missing on Vercel, the UI shows *“Subscription is temporarily unavailable”* and the JSON body includes `"code":"missing_supabase_env"`. Resend may still show **0 uses** because the handler returns before calling Resend.

## 5. UI

- Footer: **ZANC updates** subscribe form (`SubscribeForm`).
- Reuse `<SubscribeForm variant="inline" />` on Home or Community later.

## Troubleshooting

- **`Could not reach the server` on production**: Usually the SPA is serving **`index.html`** for **`POST /api/subscribe`** (routing misconfiguration). The project’s **`vercel.json`** must **not** send `/api/*` to the React app — use a rewrite that excludes `/api/` (see repo `frontend/vercel.json`). After fixing, redeploy and test with **Network** tab: `/api/subscribe` should return **JSON**, not HTML.
- **Resend**: domain + “from” must be verified; check free-tier limits.
- **Duplicates**: handled gracefully — user sees a friendly “already subscribed” message.
- **403/401 from Supabase**: wrong service role key or RLS policy blocking service role (service role should bypass RLS).
- **`Subscription is temporarily unavailable`**: API is reachable but **`SUPABASE_URL`** / **`SUPABASE_SERVICE_ROLE_KEY`** are missing or wrong in Vercel env.
