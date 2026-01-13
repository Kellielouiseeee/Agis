"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contractService_1 = __importDefault(require("../services/contractService"));
const validationService_1 = __importDefault(require("../services/validationService"));
const router = express_1.default.Router();
// POST /game/session - start a new game session
router.post('/session', (req, res) => {
    const { address, clientInfo } = req.body;
    if (!address)
        return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'address required' });
    // create simple session id (for prod use secure random nonce store)
    const sessionId = `sess-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    return res.json({ ok: true, sessionId });
});
// POST /game/result - receive results from frontend and record on-chain
router.post('/result', async (req, res) => {
    const { sessionId, address, score, proof, eventsHash, durationMs } = req.body;
    if (!sessionId || !address || typeof score !== 'number')
        return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'sessionId, address and numeric score required' });
    // basic validation: duration and eventsHash presence
    if (!eventsHash || typeof durationMs !== 'number') {
        return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'eventsHash and durationMs required' });
    }
    try {
        // call validation service to verify inputs
        const sessOk = validationService_1.default.validateSession(sessionId, address);
        const scoreOk = validationService_1.default.validateScore(score);
        const durOk = validationService_1.default.validateDuration(durationMs);
        const eventsOk = validationService_1.default.validateEventsHash(eventsHash);
        const proofOk = validationService_1.default.validateProof(proof);
        if (!sessOk || !scoreOk || !durOk || !eventsOk || !proofOk) {
            return res.status(400).json({ accepted: false, reason: 'invalid_proof' });
        }
        const job = await contractService_1.default.queueRecordGameResult(sessionId, address, score, { eventsHash, durationMs });
        return res.status(202).json({ ok: true, queued: true, jobId: job.jobId });
    }
    catch (e) {
        console.error('game result error', e);
        return res.status(500).json({ ok: false, code: 'ERR_INTERNAL', message: e?.message ?? 'internal' });
    }
});
exports.default = router;
