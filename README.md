# ZANC — Association of Zambians in California

Website and membership/insurance application for the **Association of Zambians in California**.

## Repository Layout

```
zanc-site/
├── frontend/          # Vite + React app (deployed to Vercel)
├── backend/           # Node.js API + Prisma ORM (deployed to Railway/Render)
├── docs/              # Additional documentation
├── HANDOFF.md         # Migration plan & ownership handoff checklist
└── README.md          # This file
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (or Supabase project)
- Stripe account (for payment processing)

### Frontend

```bash
cd frontend
cp .env.example .env.local    # Fill in real values
npm install
npm run dev                   # Starts on http://localhost:5173
```

### Backend

```bash
cd backend
cp .env.example .env          # Fill in real values
npm install
npx prisma migrate dev        # Run database migrations
npm run dev                   # Starts on http://localhost:4000
```

## Deployment

- **Frontend** → Vercel (auto-deploys from `main` branch, root directory set to `frontend/`)
- **Backend** → Railway or Render (root directory set to `backend/`)

See `HANDOFF.md` for full environment variable reference and ownership transfer instructions.

## Migration & Ownership

For details on how to migrate the site and transfer ownership to ZANC, see **[HANDOFF.md](./HANDOFF.md)**.
