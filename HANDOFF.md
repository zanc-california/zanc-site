# ZANC Site — Migration & Ownership Handoff

Frontend-only architecture: **Vercel** (frontend) + **Supabase** (auth, database, storage) + **Stripe Payment Links**. No backend server.

---

## Current production setup

| What | Value |
|------|--------|
| **Repo** | [github.com/zanc-california/zanc-site](https://github.com/zanc-california/zanc-site) |
| **Production URL** | [zanc-site.vercel.app](https://zanc-site.vercel.app) |
| **Vercel dashboard** | [vercel.com/leverage-labs/zanc-site](https://vercel.com/leverage-labs/zanc-site) |
| **Vercel connected repo** | [zanc-california/zanc-site](https://github.com/zanc-california/zanc-site) (main branch) |
| **Vercel root directory** | `frontend/` |
| **Framework** | Vite |
| **Auto-deploy** | On push to `main` |

Single source of truth: GitHub and Vercel both point at **zanc-california/zanc-site**.

---

## Architecture summary

- **Frontend:** Vite + React + Tailwind. Deployed on Vercel. No backend API calls.
- **Supabase:** Auth (admin login), Database (tables: `news`, `gallery`, `admins`), Storage (bucket `images` for gallery and news covers).
- **Stripe:** Payment Links for membership and insurance. Buttons on the site link to Stripe-hosted checkout. Success/cancel redirect to `/payment-success` and `/payment-cancel`.
- **Hosting cost:** Vercel free tier + Supabase free tier + Stripe (pay per transaction). No server = $0 server hosting.

---

## Handoff to ZANC (when they’re ready)

### 1. Accounts ZANC should have

- **GitHub** — Repo is already under `zanc-california`. Ensure org members/admins as needed.
- **Vercel** — Team or account. Transfer project [leverage-labs/zanc-site](https://vercel.com/leverage-labs/zanc-site) to that team (Settings → Transfer). No repo reconnection needed.
- **Supabase** — Project for auth, database, storage. Either transfer existing project or create new and re-run migrations, then update env vars.
- **Stripe** — Account for Payment Links. Update links in Vercel env if ZANC uses a new Stripe account.
- **Domain** — Point DNS to Vercel; update Stripe success/cancel URLs if domain changes.

### 2. Transfer checklist

- [ ] **GitHub:** [zanc-california/zanc-site](https://github.com/zanc-california/zanc-site) — add/remove members as needed.
- [ ] **Vercel:** Transfer project to ZANC’s team. Ensure env vars are re-added after transfer (see below).
- [ ] **Supabase:** Transfer project or create new; run `supabase/migrations/001_initial_schema.sql`; create `images` bucket; add admin user(s) to `admins` table. Update `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel.
- [ ] **Stripe:** Use ZANC’s Stripe; create Payment Links; set success/cancel URLs; update `VITE_STRIPE_MEMBERSHIP_LINK` and `VITE_STRIPE_INSURANCE_LINK` in Vercel.
- [ ] **Secrets:** Hand over access to Vercel env, Supabase dashboard, Stripe dashboard. Revoke your access where appropriate.

### 3. What to give ZANC

- This repo and **HANDOFF.md** (this file), **README.md**.
- Env checklist below (variable names only; no values).

---

## Environment variables

**Frontend only** (set in Vercel → Project → Settings → Environment Variables). No backend.

| Variable | Purpose |
|----------|--------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `VITE_STRIPE_MEMBERSHIP_LINK` | Stripe Payment Link URL for membership |
| `VITE_STRIPE_INSURANCE_LINK` | Stripe Payment Link URL for insurance |

Optional (only if using Stripe Checkout via Edge Function instead of Payment Links):

| Variable | Purpose |
|----------|--------|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |

Never commit real values. Use `frontend/.env.example` as a template; copy to `.env.local` for local dev.

---

## Supabase setup (one-time)

1. Create a Supabase project.
2. Run the SQL in `supabase/migrations/001_initial_schema.sql` (creates `news`, `gallery`, `admins` + RLS).
3. Create a storage bucket named `images` (public read, authenticated write). Use paths `gallery/` and `news/` for uploads.
4. In Auth, create an admin user (email + password). Copy their UUID from Auth → Users and insert into `admins`: `INSERT INTO admins (id) VALUES ('uuid-here');`

---

## Summary

- **Site:** Content (news, gallery) + membership/insurance payment links. Admin panel at `/admin` for news and gallery.
- **No backend server.** Frontend on Vercel; data and auth in Supabase; payments via Stripe Payment Links.
- **Handoff:** Transfer Vercel project and Supabase/Stripe access; update env vars; document credentials securely.
