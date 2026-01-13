"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
const txQueue_1 = require("../queues/txQueue");
const txJob_1 = require("../models/txJob");
const config_1 = require("../config");
dotenv_1.default.config();
const RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:8545';
const AGISX_ADDRESS = process.env.AGISX_ADDRESS || '';
const GAME_ENGINE_ADDRESS = process.env.GAME_ENGINE_ADDRESS || '';
const REWARDS_POOL_ADDRESS = process.env.REWARDS_POOL_ADDRESS || '';
function loadAbiFromArtifacts(contractName) {
    const candidates = [
        path_1.default.join(process.cwd(), '..', 'contracts', 'artifacts', 'contracts', `${contractName}.sol`, `${contractName}.json`),
        path_1.default.join(process.cwd(), '..', 'contracts', 'artifacts', 'contracts', 'contracts_src', `${contractName}.sol`, `${contractName}.json`),
        path_1.default.join(process.cwd(), '..', 'contracts', 'artifacts', `${contractName}.json`),
        path_1.default.join(process.cwd(), '..', 'contracts', 'artifacts', 'contracts', `${contractName}.json`)
    ];
    for (const c of candidates) {
        try {
            if (fs_1.default.existsSync(c)) {
                const raw = fs_1.default.readFileSync(c, 'utf8');
                const json = JSON.parse(raw);
                if (json.abi)
                    return json.abi;
            }
        }
        catch (e) {
            // ignore
        }
    }
    return null;
}
class ContractService {
    constructor() {
        this.provider = new ethers_1.ethers.JsonRpcProvider(RPC_URL);
        this.agisAbi = loadAbiFromArtifacts('AGISX') || [
            'function balanceOf(address) view returns (uint256)',
            'function transfer(address,uint256) returns (bool)'
        ];
        this.gameAbi = loadAbiFromArtifacts('GameEngine') || [
            'function getPlayer(address) view returns (uint256,uint256)',
            'function recordGameResult(address player,uint256 score,uint256 xp,bytes32 sessionId)'
        ];
    }
    async getPlayerXP(address) {
        if (!GAME_ENGINE_ADDRESS)
            return 0;
        try {
            const contract = new ethers_1.ethers.Contract(GAME_ENGINE_ADDRESS, this.gameAbi, this.provider);
            const res = await contract.getPlayer(address);
            const xp = BigInt(res[0]?.toString ? res[0].toString() : '0');
            return Number(xp);
        }
        catch (e) {
            console.warn('getPlayerXP failed', e);
            return 0;
        }
    }
    async getRewards(address) {
        if (!GAME_ENGINE_ADDRESS)
            return { pending: 0, claimable: 0 };
        try {
            const contract = new ethers_1.ethers.Contract(GAME_ENGINE_ADDRESS, this.gameAbi, this.provider);
            const res = await contract.getPlayer(address);
            const claimable = Number(BigInt(res[1]?.toString ? res[1].toString() : '0'));
            return { pending: 0, claimable };
        }
        catch (e) {
            console.warn('getRewards failed', e);
            return { pending: 0, claimable: 0 };
        }
    }
    async queueTransferTokens(to, amount, metadata) {
        // basic validation
        if (!AGISX_ADDRESS)
            throw new Error('AGISX contract not configured');
        const idempotencyKey = `transfer:${to}:${amount.toString()}`;
        const job = await (0, txQueue_1.enqueueTx)({
            type: 'TRANSFER',
            chainId: 1,
            to,
            amount: amount.toString(),
            payload: metadata,
            idempotencyKey
        });
        return job;
    }
    async queueRecordGameResult(sessionId, address, score, metadata, operator) {
        // basic validation: ensure sessionId and address
        if (!GAME_ENGINE_ADDRESS)
            throw new Error('GAME_ENGINE contract not configured');
        const xp = metadata && typeof metadata.xp === 'number' ? metadata.xp : 0;
        const idempotencyKey = `game:${sessionId}:${address}`;
        const job = await (0, txQueue_1.enqueueTx)({
            type: 'GAME_RESULT',
            chainId: 1,
            payload: { sessionId, player: address, score, xp, metadata, operator },
            idempotencyKey
        });
        return job;
    }
    getTxStatus(jobId) {
        const job = (0, txJob_1.getJob)(jobId);
        if (!job)
            return null;
        return { id: job.id, status: job.status, txHash: job.txHash, attempts: job.attempts, errorMessage: job.errorMessage };
    }
}
exports.ContractService = ContractService;
// Export either mock or real implementation based on DEV_MODE
const instance = config_1.DEV_MODE ? require('./mockContractService').default : new ContractService();
exports.default = instance;
