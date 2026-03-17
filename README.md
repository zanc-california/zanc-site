# ZANC — Association of Zambians in California

Website and membership/insurance application for the Association of Zambians in California.

**Repo:** [github.com/zanc-california/zanc-site](https://github.com/zanc-california/zanc-site) · **Live site:** [zanc-site.vercel.app](https://zanc-site.vercel.app)

## Repository layout

- **`frontend/`** — React (Vite, TypeScript, Tailwind) SPA. Auth via Supabase; API calls to backend.
- **`backend/`** — Express API (Node, Prisma, PostgreSQL). Stripe payments; optional Supabase webhook.
- **`docs/`** — Additional documentation (if present).

## Quick start (developers)

- **Frontend:** `cd frontend && npm install && cp .env.example .env.local` (fill in values), then `npm run dev` (port 5173).
- **Backend:** `cd backend && npm install && cp .env.example .env` (fill in values), `npx prisma migrate dev`, then `npm run dev` (port 4000).
- Set `VITE_BACKEND_URL` in frontend to your backend URL; backend needs PostgreSQL, Supabase, and Stripe env vars.

## Deployment

| Component | Where | Notes |
|-----------|--------|--------|
| Frontend | [Vercel](https://vercel.com/leverage-labs/zanc-site) | Root: `frontend/`, Framework: Vite, auto-deploy on push to `main` |
| Backend | Railway / Render / etc. | Root: `backend/`, needs env vars and `npx prisma migrate deploy` |

## Migration and ownership

**If you are migrating the site or handing off ownership to ZANC**, see **[HANDOFF.md](./HANDOFF.md)**. It covers:

- Migrating to a new host (your GitHub/Vercel first, or straight into ZANC’s accounts).
- Full checklist for handing the project over to ZANC when they’re ready.
- Environment variable list for Frontend and Backend.

No ZANC member needs to run the migration; it can be done once by the person performing the move.
