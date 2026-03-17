# ZANC Site — Migration & Ownership Handoff

This document describes how to **migrate** the site to a new hosting setup and how to **hand off** full ownership to ZANC when they are ready. No ZANC member needs to run the migration; it can be done by the person doing the one-time move.

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

Single source of truth: GitHub and Vercel both point at **zanc-california/zanc-site**. No fork, no drift. Ready for code push into `frontend/` and `backend/`.

---

## Two Ways to Run the Migration

### Option A: You migrate now, ZANC takes over later (recommended)

**Who does what**

- **You (or contractor):** Create a single GitHub repo (your account or a ZANC org), connect Vercel + Supabase (your or ZANC’s), run the migration once. You operate the site and charge a small fee until ZANC is ready.
- **ZANC:** No action now. When ready, they get accounts and you follow the “Handoff to ZANC” section below.

**Why this is clean**

- One migration, one source of truth (this repo).
- No need for ZANC to create accounts or run anything right now.
- Handoff is a defined checklist (this doc); you’re not “handing over your personal accounts,” you’re transferring a project and optionally an org.

---

### Option B: ZANC creates accounts now, you migrate into them

**Who does what**

- **ZANC (or you on their behalf):** Create:
  - GitHub org (e.g. `zanc-california`) and repo, or a repo under a ZANC-owned personal account.
  - Vercel account (or team).
  - Supabase project (under a ZANC email or shared org email).
- **You:** Push code to their repo, connect their Vercel to it, point app to their Supabase (and new DB if desired). From day one, everything lives under ZANC’s accounts.

**Why use this**

- ZANC wants to own everything from the start and only needs you to do the technical steps.
- No later transfer of GitHub/Vercel/Supabase; only handover of login details and docs.

---

## Option A — Step-by-step: Migrate and run under your control

Do this once. Afterward, the site runs on your (or a neutral) GitHub + Vercel + Supabase until handoff.

1. **GitHub**
   - Create a new repo (e.g. `zanc-website`). If ZANC might take over later, consider creating a GitHub org like `zanc-california` and putting the repo there (you can be the only member at first).
   - Push this codebase (only `Frontend/` and `Backend/` and root files; exclude `node_modules`, `.env`, and any secrets). Ensure `.gitignore` is correct.

2. **Supabase**
   - Either keep the existing Supabase project (and note its URL and keys) or create a new project under an account you’re happy to hand to ZANC later.
   - In Supabase: get **Project URL** and **anon key** (and **service_role** for backend). For handoff later, ZANC can create a new project and you’ll just swap env vars.

3. **PostgreSQL (database)**
   - Backend uses Prisma + PostgreSQL. If Supabase DB is used, `DATABASE_URL` and `DIRECT_URL` are in Supabase project settings. If you use another host (e.g. Neon, Railway), create a DB and run `npx prisma migrate deploy` from `Backend/`.

4. **Vercel**
   - **Frontend:** New project → Import from the GitHub repo. Set root directory to `frontend/` (lowercase; repo uses `frontend/` and `backend/`). Add env vars (see “Environment variables” below). Deploy.
   - **Backend:** Host the backend elsewhere (e.g. Railway, Render, Fly.io); set root to `backend/`. Backend needs a public URL for the frontend’s `VITE_BACKEND_URL`.

5. **Stripe**
   - Use the existing Stripe account or create one. Get **Secret key**, **Webhook signing secret**, and set **Success/Cancel URLs** to the new frontend URL. Configure webhook endpoint to point to the new backend URL (e.g. `https://your-backend.example.com/api/webhook`).

6. **Env and CORS**
   - Set all env vars (see list below). On the backend, set `FRONTEND_URL` to the frontend URL (e.g. `https://zanc-site.vercel.app`). Backend `server.ts` also allows `https://zanc-membership-app.vercel.app` in production; update if your URL differs.

7. **Smoke test**
   - Sign up, sign in, membership/application flow, payment, and admin. Confirm emails and webhooks (Stripe, optional Supabase webhook).

After this, the site is “migrated.” You run it and charge a small fee; when ZANC is ready, you follow the handoff section.

---

## Handoff to ZANC (when they’re ready)

Use this when ZANC will fully own and run the site (their GitHub, Vercel, Supabase, and optionally Stripe).

### 1. Accounts ZANC should have

- **GitHub:** Org or account where the repo will live.
- **Vercel:** Team or account for the frontend (and backend if you host it on Vercel).
- **Supabase:** Project for auth (and DB if you use Supabase Postgres).
- **Stripe:** Account for payments (can stay with ZANC’s existing one or a new one).
- **Domain/email:** Shared ZANC email for “recovery” or billing (e.g. `tech@zanc.org` or `president@zanc.org`) is recommended.

### 2. Transfer checklist

- [ ] **Repo:** [zanc-california/zanc-site](https://github.com/zanc-california/zanc-site) is already under the ZANC org. Ensure ZANC has the right members/admins; remove or demote yourself if desired.
- [ ] **Vercel:** ZANC creates a Vercel team (or uses an existing account). Transfer the project [leverage-labs/zanc-site](https://vercel.com/leverage-labs/zanc-site) to that team (Settings → Transfer). Repo is already [zanc-california/zanc-site](https://github.com/zanc-california/zanc-site); no reconnection needed. Ensure ZANC has the env vars (see below) or re-add after transfer.
- [ ] **Supabase:** Either (a) transfer the project to another Supabase account (if supported) or (b) ZANC creates a new Supabase project; you export/import data if needed, then update env vars everywhere to the new URL/keys.
- [ ] **Backend host:** If backend is on a platform (Railway, Render, etc.), transfer the project or recreate it under ZANC’s account and point env to the new backend URL.
- [ ] **Stripe:** Use ZANC’s Stripe account; create product/price and webhook endpoint; update backend env with new secret key and webhook secret; update Success/Cancel URLs if needed.
- [ ] **Env vars:** Update Frontend and Backend env vars to use ZANC’s Supabase, backend URL, Stripe keys, and any new email (Nodemailer) credentials. Re-deploy.
- [ ] **Domain:** Point the live domain to ZANC’s Vercel (or their hosting). Update CORS and Stripe redirect URLs if the domain changes.
- [ ] **Secrets and access:** Provide ZANC with a list of where secrets live (Vercel env, Supabase dashboard, Stripe dashboard, backend host). No need to paste secrets in email; use a password manager or secure handoff. Revoke your access where appropriate.

### 3. What to give ZANC

- This repo (already transferred or cloned).
- **HANDOFF.md** (this file) and **README.md**.
- **Env checklist** (below) with *names* of variables only (no values).
- Link to this doc and a short note: “When you’re ready to run or change the site, start with README and HANDOFF; all accounts and env are listed there.”

---

## Environment variables (checklist)

Use this to set up or audit config. **Never commit real values.**

### Frontend (Vercel, or wherever the SPA is built)

| Variable | Purpose |
|----------|--------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `VITE_BACKEND_URL` | Full backend API base URL (e.g. `https://api.zanc.org`) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (for checkout UI) |

### Backend (Vercel serverless / Railway / Render / etc.)

| Variable | Purpose |
|----------|--------|
| `DATABASE_URL` | PostgreSQL connection string (Prisma) |
| `DIRECT_URL` | Direct PostgreSQL URL (Prisma, e.g. for migrations) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (auth verification) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `SUCCESS_URL` | Frontend URL for post-payment success (e.g. `https://zanc.org/success`) |
| `CANCEL_URL` | Frontend URL for payment cancelled |
| `FRONTEND_URL` | Frontend origin for CORS |
| `EMAIL_USER` | SMTP user (e.g. Gmail) for Nodemailer |
| `EMAIL_PASS` | SMTP password or app password |
| `PORT` | Server port (often set by host) |
| `NODE_ENV` | `production` or `development` |
| `SUPABASE_WEBHOOK_SECRET` | (Optional) For Supabase DB webhook signature verification |

### Optional

- **Supabase:** If using Supabase DB, get `DATABASE_URL` and `DIRECT_URL` from Project Settings → Database.
- **Stripe webhook:** Must point to `https://<backend>/api/webhook` and use raw body; Stripe CLI can forward for local testing.

---

## Summary

- **Cleanest path:** Migrate once using **Option A** (you run GitHub + Vercel + Supabase + backend). Charge a small fee. When ZANC is ready, follow the **Handoff to ZANC** checklist; they get full ownership without needing to execute the initial migration.
- **Alternative:** Use **Option B** if ZANC creates GitHub, Vercel, and Supabase now; you only do the technical migration into their accounts so they own everything from day one.

Keep this file in the repo so anyone (you or a future ZANC tech person) can run the handoff from the same instructions.
