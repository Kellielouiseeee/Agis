import { v4 as uuidv4 } from 'uuid';
import { createJob, updateJob, getJob } from '../models/txJob';

type RewardSummary = { pending: number; claimable: number };

const xpMap = new Map<string, number>();
const rewardsMap = new Map<string, RewardSummary>();

function ensureReward(addr: string) {
  if (!rewardsMap.has(addr)) rewardsMap.set(addr, { pending: 0, claimable: 0 });
  return rewardsMap.get(addr)!;
}

export class MockContractService {
  async getPlayerXP(address: string): Promise<number> {
    return xpMap.get(address.toLowerCase()) ?? 0;
  }

  async getRewards(address: string): Promise<RewardSummary> {
    const r = ensureReward(address.toLowerCase());
    return { pending: r.pending, claimable: r.claimable };
  }

  async queueTransferTokens(to: string, amount: bigint, metadata?: any): Promise<{ jobId: string }> {
    const id = uuidv4();
    const now = new Date().toISOString();
    createJob({
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
    } as any);
    return { jobId: id };
  }

  async queueRecordGameResult(sessionId: string, address: string, score: number, metadata?: any, operator?: string): Promise<{ jobId: string }> {
    const addr = address.toLowerCase();
    const xp = metadata && typeof metadata.xp === 'number' ? metadata.xp : Math.max(0, Math.floor(score / 10));
    const reward = Math.floor(xp / 10);
    const prev = xpMap.get(addr) ?? 0;
    xpMap.set(addr, prev + xp);
    const r = ensureReward(addr);
    r.pending += reward;

    const id = uuidv4();
    const now = new Date().toISOString();
    createJob({
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
    } as any);

    return { jobId: id };
  }

  getTxStatus(jobId: string) {
    const j = getJob(jobId);
    if (!j) return null;
    return { id: j.id, status: j.status, txHash: j.txHash, attempts: j.attempts, errorMessage: j.errorMessage };
  }
}

const mock = new MockContractService();
export default mock;
