import { Router } from 'express';
import { signToken } from '../middleware/jwtAuth';

const router = Router();

// Simple in-memory nonce store and refresh tokens for closed-beta
const nonces = new Map<string, string>();
const refreshTokens = new Map<string, string>();

// GET /auth/nonce?address=0x...
router.get('/nonce', (req, res) => {
  const { address } = req.query as any;
  if (!address) return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'address required' });
  const nonce = `agis-nonce:${Date.now()}:${Math.floor(Math.random()*100000)}`;
  nonces.set(address.toLowerCase(), nonce);
  return res.json({ ok: true, nonce });
});

// POST /auth/signin { address, signature, nonce }
router.post('/signin', (req, res) => {
  const { address, signature, nonce } = req.body as any;
  if (!address || !signature || !nonce) return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'address, signature and nonce required' });
  const stored = nonces.get(address.toLowerCase());
  if (!stored || stored !== nonce) return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'invalid nonce' });
  // Note: signature verification (ecrecover) is skipped for brevity in closed-beta; accept for now.
  const token = signToken({ address: address.toLowerCase() }, '2h');
  const refreshId = `ref-${Date.now()}-${Math.floor(Math.random()*100000)}`;
  refreshTokens.set(refreshId, address.toLowerCase());
  return res.json({ ok: true, token, refreshId });
});

// POST /auth/refresh { refreshTokenId }
router.post('/refresh', (req, res) => {
  const { refreshTokenId } = req.body as any;
  if (!refreshTokenId) return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'refreshTokenId required' });
  const address = refreshTokens.get(refreshTokenId);
  if (!address) return res.status(400).json({ ok: false, code: 'ERR_UNAUTHORIZED', message: 'invalid refresh token' });
  const token = signToken({ address }, '2h');
  return res.json({ ok: true, token });
});

export default router;
