# Frontend Game Flow

Login → Start session → Play → Submit result → View rewards → Claim → See status

1. Login
- User connects wallet via `WalletConnect` component.
- Client requests nonce: `GET /auth/nonce?address=0x...`.
- User signs nonce with wallet; frontend sends signature to `POST /auth/signin`.
- Backend returns JWT token; frontend stores token in memory via `apiClient.setToken()`.

2. Start session
- User clicks Play; frontend calls `POST /game/session` to create a server session.
- Backend returns `sessionId` and any session metadata.
- Frontend sends session to mini-game iframe via `postMessage({type:'SESSION', payload:{sessionId}})`.

3. Play
- Mini-game runs client-side. When finished, it posts result to parent using `postMessage({type:'GAME_RESULT', payload})`.

4. Submit result
- Parent receives `GAME_RESULT` and calls `POST /game/result` with JWT auth.
- Backend validates event trace and enqueues an on-chain job; response contains `jobId`.

5. View rewards
- Frontend polls `GET /rewards/balance/:address` to show claimable and pending rewards.

6. Claim
- User clicks Claim; frontend calls `POST /rewards/claim` and receives `jobId` for the claim.
- Frontend polls `GET /tx/status/:jobId` to update claim status.

Security notes:
- All on-chain writes are queued; heavy validations and manual review for high-value claims occur off-chain.
- JWT is kept in memory by default; for production prefer httpOnly cookie set by backend.
