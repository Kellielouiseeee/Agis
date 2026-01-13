# Frontend (Next.js)

This is a minimal Next.js + Tailwind scaffold for AGIS. It embeds the lightweight `agis-game` demo at `/agis-game`.

Run:

```bash
cd frontend
npm install
npm run dev
# open http://localhost:3000
```

The frontend calls backend endpoints at `http://localhost:3000` (ensure the backend is running).
# AGIS Frontend

This folder contains a minimal AGIS demo game in `agis-game/` and a simple build script.

Run locally (development):

```bash
# serve the demo directly
cd frontend/agis-game
python3 -m http.server 5173
# open http://localhost:5173/ in your browser
```

Build (creates `frontend/dist`):

```bash
cd frontend
npm install
npm run build
```

Serve the built site:

```bash
cd frontend/dist
python3 -m http.server 5173
# open http://localhost:5173/
```

Files added by the merge process are in the repository root and in `frontend/`, `backend/`, `contracts/`, and `docs/`.
