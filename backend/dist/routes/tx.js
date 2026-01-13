"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const txJob_1 = require("../models/txJob");
const router = (0, express_1.Router)();
router.get('/status/:jobId', (req, res) => {
    const { jobId } = req.params;
    if (!jobId)
        return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'jobId required' });
    const job = (0, txJob_1.getJob)(jobId);
    if (!job)
        return res.status(404).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'job not found' });
    return res.json({ ok: true, jobId: job.id, status: job.status, txHash: job.txHash, attempts: job.attempts, error: job.errorMessage });
});
exports.default = router;
