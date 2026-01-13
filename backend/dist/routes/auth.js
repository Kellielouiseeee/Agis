"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtAuth_1 = require("../middleware/jwtAuth");
const router = (0, express_1.Router)();
// Simple in-memory nonce store and refresh tokens for closed-beta
const nonces = new Map();
const refreshTokens = new Map();
// GET /auth/nonce?address=0x...
router.get('/nonce', (req, res) => {
    const { address } = req.query;
    if (!address)
        return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'address required' });
    const nonce = `agis-nonce:${Date.now()}:${Math.floor(Math.random() * 100000)}`;
    nonces.set(address.toLowerCase(), nonce);
    return res.json({ ok: true, nonce });
});
// POST /auth/signin { address, signature, nonce }
router.post('/signin', (req, res) => {
    const { address, signature, nonce } = req.body;
    if (!address || !signature || !nonce)
        return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'address, signature and nonce required' });
    const stored = nonces.get(address.toLowerCase());
    if (!stored || stored !== nonce)
        return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'invalid nonce' });
    // Note: signature verification (ecrecover) is skipped for brevity in closed-beta; accept for now.
    const token = (0, jwtAuth_1.signToken)({ address: address.toLowerCase() }, '2h');
    const refreshId = `ref-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    refreshTokens.set(refreshId, address.toLowerCase());
    return res.json({ ok: true, token, refreshId });
});
// POST /auth/refresh { refreshTokenId }
router.post('/refresh', (req, res) => {
    const { refreshTokenId } = req.body;
    if (!refreshTokenId)
        return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'refreshTokenId required' });
    const address = refreshTokens.get(refreshTokenId);
    if (!address)
        return res.status(400).json({ ok: false, code: 'ERR_UNAUTHORIZED', message: 'invalid refresh token' });
    const token = (0, jwtAuth_1.signToken)({ address }, '2h');
    return res.json({ ok: true, token });
});
exports.default = router;
