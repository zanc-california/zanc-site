# ZANC Site — Migration & Ownership Handoff

This document describes how to **migrate** the site to its new hosting setup and how to **hand off** full ownership to ZANC when they are ready.

No ZANC member needs to run the migration — it is executed once by the current maintainer.

---

## Current Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Vite + React | Member-facing UI, enrollment, insurance forms |
| Backend | Node.js + Prisma | API, business logic, Stripe webhooks |
| Database | PostgreSQL (via Supabase) | Members, applications, payments |
| Auth | Supabase Auth | Login, session management |
| Payments | Stripe | Membership dues, insurance premiums |
| Hosting (Frontend) | Vercel | Auto-deploys from `main` branch |
| Hosting (Backend) | Railway / Render | API server |
| Domain | TBD | DNS pointed to Vercel + backend host |
| Repo | GitHub (`zanc-california` org) | Source of truth |

---

## Option A — Maintainer Migrates, ZANC Takes Over Later (Recommended)

**Why this is cleanest:**

- No dependency on ZANC right now — one person does the migration once
- Single handoff later — when ZANC is ready, follow the checklist below
- Clear and fair — small monthly fee covers hosting costs + maintainer time until handoff
- Low risk — ZANC doesn't touch your personal accounts; the GitHub org is already ZANC-branded

**What happens now:**

1. Code lives in `zanc-california/zanc-site` GitHub repo (maintainer is org admin)
2. Vercel project connected to the repo (auto-deploys on push to `main`)
3. Backend deployed to Railway or Render
4. Supabase project created (maintainer holds credentials)
5. Stripe account connected (ideally a ZANC-owned Stripe from the start)
6. Domain DNS pointed to Vercel (frontend) + backend host

**Monthly fee covers:**

- Vercel hosting (free tier likely sufficient)
- Railway/Render backend hosting ($5–7/mo)
- Supabase (free tier likely sufficient)
- Maintainer availability for updates and fixes
- Agreed flat fee: **$___/month** (fill in agreed amount)

---

## Option B — ZANC Creates Accounts Now

If ZANC prefers to own everything from day one:

1. A ZANC officer creates accounts on: GitHub, Vercel, Supabase, Stripe
2. Maintainer is added as a collaborator/admin to each
3. Maintainer does the technical migration into those accounts
4. ZANC owns all credentials from the start

**Tradeoff:** Requires a ZANC member to create and manage accounts. More friction now, less friction at handoff.

---

## Handoff Checklist — When ZANC Is Ready

### 1. GitHub Repository

- [ ] ZANC creates their own GitHub org (or the `zanc-california` org is already theirs)
- [ ] Add ZANC admin(s) as org owners
- [ ] Remove maintainer from org (or downgrade to read-only)
- [ ] No repo transfer needed if using the `zanc-california` org

### 2. Vercel

- [ ] ZANC creates a Vercel account/team
- [ ] Transfer Vercel project to ZANC's team ([Vercel docs: transfer project](https://vercel.com/docs/projects/overview#transferring-a-project))
- [ ] Re-link GitHub repo if org ownership changed
- [ ] Re-enter all environment variables (see below)

### 3. Supabase

- [ ] ZANC creates a Supabase organization
- [ ] Transfer the Supabase project, or:
  - Create a new Supabase project
  - Run database migration (`npx prisma migrate deploy`)
  - Export/import existing data
  - Update `DATABASE_URL` and `DIRECT_URL` in backend env
  - Update `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in frontend env

### 4. Stripe

- [ ] ZANC creates their own Stripe account (if not already done)
- [ ] Update webhook endpoints to point to ZANC's backend URL
- [ ] Update `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in backend env
- [ ] Update `VITE_STRIPE_PUBLISHABLE_KEY` in frontend env
- [ ] Test a payment end-to-end in test mode before going live

### 5. Domain / DNS

- [ ] Transfer domain registrar access to ZANC (or ensure they already own it)
- [ ] Update DNS A/CNAME records to point to ZANC's Vercel deployment
- [ ] Update backend DNS if the API URL changes
- [ ] Update `VITE_BACKEND_URL` in frontend env

### 6. Final Steps

- [ ] ZANC verifies the site works end-to-end (signup, login, payment, admin)
- [ ] Maintainer hands over this document + any remaining credentials
- [ ] Maintainer steps back; ZANC is fully self-sufficient

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Prisma connection string (pooled, e.g. via Supabase) |
| `DIRECT_URL` | Direct PostgreSQL connection (for migrations) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `STRIPE_SECRET_KEY` | Stripe secret key (server-side only) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `PORT` | Backend server port (default `4000`) |
| `NODE_ENV` | `development` or `production` |
| `CORS_ORIGIN` | Frontend URL for CORS (e.g. `https://zanc.org`) |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `VITE_BACKEND_URL` | Full backend API base URL (e.g. `https://api.zanc.org`) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (for checkout UI) |

---

## Notes

- `.env` and `.env.local` are in `.gitignore` — secrets are never committed
- Use `.env.example` files in each folder as templates
- All secrets should also be set in Vercel (frontend) and Railway/Render (backend) dashboards
- Supabase Row Level Security (RLS) policies should be reviewed during handoff
