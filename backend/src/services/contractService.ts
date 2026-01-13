import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { enqueueTx } from '../queues/txQueue';
import { getJob } from '../models/txJob';
import { DEV_MODE } from '../config';

dotenv.config();

const RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:8545';
const AGISX_ADDRESS = process.env.AGISX_ADDRESS || '';
const GAME_ENGINE_ADDRESS = process.env.GAME_ENGINE_ADDRESS || '';
const REWARDS_POOL_ADDRESS = process.env.REWARDS_POOL_ADDRESS || '';

type RewardSummary = { pending: number; claimable: number };

function loadAbiFromArtifacts(contractName: string): any[] | null {
  const candidates = [
    path.join(process.cwd(), '..', 'contracts', 'artifacts', 'contracts', `${contractName}.sol`, `${contractName}.json`),
    path.join(process.cwd(), '..', 'contracts', 'artifacts', 'contracts', 'contracts_src', `${contractName}.sol`, `${contractName}.json`),
    path.join(process.cwd(), '..', 'contracts', 'artifacts', `${contractName}.json`),
    path.join(process.cwd(), '..', 'contracts', 'artifacts', 'contracts', `${contractName}.json`)
  ];
  for (const c of candidates) {
    try {
      if (fs.existsSync(c)) {
        const raw = fs.readFileSync(c, 'utf8');
        const json = JSON.parse(raw);
        if (json.abi) return json.abi;
      }
    } catch (e) {
      // ignore
    }
  }
  return null;
}

export class ContractService {
  provider: ethers.JsonRpcProvider;
  agisAbi: any[];
  gameAbi: any[];

  constructor() {
    this.provider = new ethers.JsonRpcProvider(RPC_URL);
    this.agisAbi = loadAbiFromArtifacts('AGISX') || [
      'function balanceOf(address) view returns (uint256)',
      'function transfer(address,uint256) returns (bool)'
    ];
    this.gameAbi = loadAbiFromArtifacts('GameEngine') || [
      'function getPlayer(address) view returns (uint256,uint256)',
      'function recordGameResult(address player,uint256 score,uint256 xp,bytes32 sessionId)'
    ];
  }

  async getPlayerXP(address: string): Promise<number> {
    if (!GAME_ENGINE_ADDRESS) return 0;
    try {
      const contract = new ethers.Contract(GAME_ENGINE_ADDRESS, this.gameAbi, this.provider);
      const res = await contract.getPlayer(address);
      const xp = BigInt(res[0]?.toString ? res[0].toString() : '0');
      return Number(xp);
    } catch (e) {
      console.warn('getPlayerXP failed', e);
      return 0;
    }
  }

  async getRewards(address: string): Promise<RewardSummary> {
    if (!GAME_ENGINE_ADDRESS) return { pending: 0, claimable: 0 };
    try {
      const contract = new ethers.Contract(GAME_ENGINE_ADDRESS, this.gameAbi, this.provider);
      const res = await contract.getPlayer(address);
      const claimable = Number(BigInt(res[1]?.toString ? res[1].toString() : '0'));
      return { pending: 0, claimable };
    } catch (e) {
      console.warn('getRewards failed', e);
      return { pending: 0, claimable: 0 };
    }
  }

  async queueTransferTokens(to: string, amount: bigint, metadata?: any): Promise<{ jobId: string }> {
    // basic validation
    if (!AGISX_ADDRESS) throw new Error('AGISX contract not configured');
    const idempotencyKey = `transfer:${to}:${amount.toString()}`;
    const job = await enqueueTx({
      type: 'TRANSFER',
      chainId: 1,
      to,
      amount: amount.toString(),
      payload: metadata,
      idempotencyKey
    });
    return job;
  }

  async queueRecordGameResult(sessionId: string, address: string, score: number, metadata?: any, operator?: string): Promise<{ jobId: string }> {
    // basic validation: ensure sessionId and address
    if (!GAME_ENGINE_ADDRESS) throw new Error('GAME_ENGINE contract not configured');
    const xp = metadata && typeof metadata.xp === 'number' ? metadata.xp : 0;
    const idempotencyKey = `game:${sessionId}:${address}`;
    const job = await enqueueTx({
      type: 'GAME_RESULT',
      chainId: 1,
      payload: { sessionId, player: address, score, xp, metadata, operator },
      idempotencyKey
    });
    return job;
  }

  getTxStatus(jobId: string) {
    const job = getJob(jobId);
    if (!job) return null;
    return { id: job.id, status: job.status, txHash: job.txHash, attempts: job.attempts, errorMessage: job.errorMessage };
  }
}

// Export either mock or real implementation based on DEV_MODE
const instance: any = DEV_MODE ? require('./mockContractService').default : new ContractService();
export default instance;
