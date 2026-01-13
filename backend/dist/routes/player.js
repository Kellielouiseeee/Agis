"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contractService_1 = __importDefault(require("../services/contractService"));
const router = (0, express_1.Router)();
router.get('/:address/xp', async (req, res) => {
    const { address } = req.params;
    if (!address)
        return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'address required' });
    try {
        const xp = await contractService_1.default.getPlayerXP(address);
        return res.json({ ok: true, address, xp });
    }
    catch (e) {
        console.error('get xp error', e);
        return res.status(500).json({ ok: false, code: 'ERR_INTERNAL', message: e?.message ?? 'internal' });
    }
});
exports.default = router;
