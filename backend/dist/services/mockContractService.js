"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockContractService = void 0;
const uuid_1 = require("uuid");
const txJob_1 = require("../models/txJob");
const xpMap = new Map();
const rewardsMap = new Map();
function ensureReward(addr) {
    if (!rewardsMap.has(addr))
        rewardsMap.set(addr, { pending: 0, claimable: 0 });
    return rewardsMap.get(addr);
}
class MockContractService {
    async getPlayerXP(address) {
        return xpMap.get(address.toLowerCase()) ?? 0;
    }
    async getRewards(address) {
        const r = ensureReward(address.toLowerCase());
        return { pending: r.pending, claimable: r.claimable };
    }
    async queueTransferTokens(to, amount, metadata) {
        const id = (0, uuid_1.v4)();
        const now = new Date().toISOString();
        (0, txJob_1.createJob)({
            id,
            type: 'TRANSFER',
            status: 'CONFIRMED',
            chainId: 1,
            to,
            amount: amount.toString(),
            payload: metadata,
            txHash: '0x' + id.replace(/-/g, '').padEnd(64, '0'),
            attempts: 0,
            maxAttempts: 1,
            createdAt: now,
            updatedAt: now,
        });
        return { jobId: id };
    }
    async queueRecordGameResult(sessionId, address, score, metadata, operator) {
        const addr = address.toLowerCase();
        const xp = metadata && typeof metadata.xp === 'number' ? metadata.xp : Math.max(0, Math.floor(score / 10));
        const reward = Math.floor(xp / 10);
        const prev = xpMap.get(addr) ?? 0;
        xpMap.set(addr, prev + xp);
        const r = ensureReward(addr);
        r.pending += reward;
        const id = (0, uuid_1.v4)();
        const now = new Date().toISOString();
        (0, txJob_1.createJob)({
            id,
            type: 'GAME_RESULT',
            status: 'CONFIRMED',
            chainId: 1,
            payload: { sessionId, player: addr, score, xp, metadata, operator },
            txHash: '0x' + id.replace(/-/g, '').padEnd(64, '0'),
            attempts: 0,
            maxAttempts: 1,
            createdAt: now,
            updatedAt: now,
        });
        return { jobId: id };
    }
    getTxStatus(jobId) {
        const j = (0, txJob_1.getJob)(jobId);
        if (!j)
            return null;
        return { id: j.id, status: j.status, txHash: j.txHash, attempts: j.attempts, errorMessage: j.errorMessage };
    }
}
exports.MockContractService = MockContractService;
const mock = new MockContractService();
exports.default = mock;
