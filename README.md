# ZANC — Association of Zambians in California

Content site with payments for the **Association of Zambians in California**.

**Repo:** [github.com/zanc-california/zanc-site](https://github.com/zanc-california/zanc-site) · **Live site:** [zanc-site.vercel.app](https://zanc-site.vercel.app)

## Architecture (frontend-only)

- **Frontend** — Vite + React + Tailwind, deployed on **Vercel**
- **Supabase** — Auth (admin only), Database (news, gallery, admins), Storage (images)
- **Stripe** — Payment Links for membership and insurance (no backend; optional Edge Function later)
- **No Express/Node backend** — no server to host

```
zanc-site/
├── frontend/           # SPA (Vercel)
│   ├── src/
│   │   ├── pages/      # Home, About, News, Gallery, Membership, Insurance, Forms, etc.
│   │   ├── admin/     # Admin login, dashboard, news CRUD, gallery CRUD
│   │   ├── components/
│   │   └── lib/       # supabase.ts, stripe.ts
│   └── public/forms/  # PDFs: membership-application.pdf, insurance-application.pdf
├── supabase/
│   └── migrations/    # Schema: news, gallery, admins + RLS
├── HANDOFF.md
└── README.md
```

## Quick start

1. **Supabase:** Create a project. Run the SQL in `supabase/migrations/001_initial_schema.sql` (Table Editor or SQL Editor). Create an `images` storage bucket (public read, authenticated write). Add your first admin user to Auth, then insert their UUID into the `admins` table.
2. **Stripe:** Create two Payment Links (membership, insurance) in the Dashboard. Set success/cancel URLs to your frontend (e.g. `https://zanc-site.vercel.app/payment-success` and `/payment-cancel`).
3. **Frontend:** `cd frontend && npm install && cp .env.example .env.local` — fill in Supabase URL/anon key and Stripe Payment Link URLs. `npm run dev` (port 5173).
4. **Forms:** Add PDFs to `frontend/public/forms/`: `membership-application.pdf`, `insurance-application.pdf`.

## Deployment

- **Vercel** — Connect repo, root directory `frontend/`, add env vars from `.env.example`. No backend to deploy.
- **Supabase** — Hosted by Supabase. Run migrations and create bucket as above.

## Migration and ownership

See **[HANDOFF.md](./HANDOFF.md)** for handoff and env reference.
