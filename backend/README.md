# AGIS Backend (Skeleton)

This is a minimal Node.js + Express + TypeScript backend scaffold for AGIS.

Quick start (from repository root):

```bash
cd backend
npm install
npm run dev
```

Available routes (stubs):
- `POST /auth/register` - register user (stub)
- `POST /auth/login` - login user (stub)
- `POST /game/session` - start game session (stub)
- `POST /game/result` - submit game result (stub)
- `GET /rewards/balance/:userId` - rewards summary (stub)
- `POST /rewards/claim` - claim rewards (stub)
- `GET /status/ping` - health check

This skeleton intentionally contains no blockchain logic yet.
# AGIS Backend

Node + TypeScript Express backend providing minimal endpoints for the demo.

Quick start:

```bash
cd backend
npm install
npm run dev
```

Available endpoints:
- `POST /api/register` { username }
- `POST /api/game/result` { userId, score }
