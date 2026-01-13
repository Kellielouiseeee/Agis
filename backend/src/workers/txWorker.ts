import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { getSigner } from '../services/signingService';
import { getJob, updateJob } from '../models/txJob';
import { onJob, requeue } from '../queues/txQueue';

dotenv.config();

const RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:8545';
const AGISX_ADDRESS = process.env.AGISX_ADDRESS || '';
const GAME_ENGINE_ADDRESS = process.env.GAME_ENGINE_ADDRESS || '';
const REWARDS_POOL_ADDRESS = process.env.REWARDS_POOL_ADDRESS || '';

function loadMinimalAbi(name: string) {
  if (name === 'AGISX') return ['function transfer(address to, uint256 amount) returns (bool)'];
  if (name === 'GameEngine') return ['function recordGameResult(address player, uint256 score, uint256 xp, bytes32 sessionId) returns (bool)'];
  if (name === 'RewardsPool') return ['function withdrawAvailable(address to, uint256 amount) returns (bool)'];
  return [];
}

async function classifyError(err: any) {
  const msg = (err && err.message) ? err.message.toLowerCase() : '';
  if (msg.includes('insufficient funds') || msg.includes('nonce')) return 'transient';
  if (msg.includes('revert') || msg.includes('invalid opcode')) return 'permanent';
  return 'manual';
}

async function processJob(jobId: string) {
  const job = getJob(jobId);
  if (!job) return;
  if (job.status !== 'PENDING' && job.status !== 'PROCESSING') return;

  updateJob(jobId, { status: 'PROCESSING', attempts: job.attempts + 1, lastAttemptAt: new Date().toISOString() });

  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const signer = await getSigner(job.chainId || 1);
    const signerConnected = signer.connect(provider);

    if (job.type === 'TRANSFER') {
      if (!AGISX_ADDRESS) throw new Error('AGISX_ADDRESS not configured');
      const abi = loadMinimalAbi('AGISX');
      const contract = new ethers.Contract(AGISX_ADDRESS, abi, signerConnected as any);
      const amount = BigInt(job.amount || '0');
      const tx = await contract.transfer(job.to, amount);
      updateJob(jobId, { txHash: tx.hash });
      const receipt = await tx.wait(1);
      updateJob(jobId, { status: 'CONFIRMED', txHash: tx.hash });
      return;
    }

    if (job.type === 'GAME_RESULT') {
      if (!GAME_ENGINE_ADDRESS) throw new Error('GAME_ENGINE_ADDRESS not configured');
      const abi = loadMinimalAbi('GameEngine');
      const contract = new ethers.Contract(GAME_ENGINE_ADDRESS, abi, signerConnected as any);
      const player = job.payload?.player;
      const score = BigInt(job.payload?.score || 0);
      const xp = BigInt(job.payload?.xp || 0);
      const sessionIdRaw = job.payload?.sessionId || '';
      // operator identity for auditing: either provided in payload or derived from signer
      let operatorIdentity = job.payload?.operator || '';
      try {
        if (!operatorIdentity && signer && (signer as any).getAddress) {
          operatorIdentity = await (signer as any).getAddress();
        }
      } catch (e) {
        // ignore
      }

      // record operator identity on the job for auditing by merging into payload
      if (operatorIdentity) {
        const existing = getJob(jobId);
        const newPayload = { ...(existing?.payload || {}), operator: operatorIdentity };
        updateJob(jobId, { payload: newPayload } as any);
      }

      // convert sessionId string -> bytes32 if needed
      let sessionIdBytes: string;
      try {
        if (typeof sessionIdRaw === 'string' && sessionIdRaw.startsWith('0x') && sessionIdRaw.length === 66) {
          sessionIdBytes = sessionIdRaw;
        } else if (typeof sessionIdRaw === 'string') {
          // convert string to bytes32 by utf8 bytes then zero-pad/truncate to 32 bytes
          const b = ethers.toUtf8Bytes(sessionIdRaw);
          const buf = new Uint8Array(32);
          buf.set(b.slice(0, 32));
          sessionIdBytes = ethers.hexlify(buf);
        } else {
          const buf = new Uint8Array(32);
          sessionIdBytes = ethers.hexlify(buf);
        }
      } catch (e) {
        // fallback: zero bytes32
        sessionIdBytes = '0x' + '0'.repeat(64);
      }

      const tx = await contract.recordGameResult(player, score, xp, sessionIdBytes);
      updateJob(jobId, { txHash: tx.hash });
      const receipt = await tx.wait(1);
      updateJob(jobId, { status: 'CONFIRMED', txHash: tx.hash });
      return;
    }

    // default: mark manual review
    updateJob(jobId, { status: 'MANUAL_REVIEW', errorMessage: 'Unknown job type' });
  } catch (err: any) {
    const kind = await classifyError(err);
    if (kind === 'transient' && job.attempts < job.maxAttempts) {
      // exponential backoff could be implemented; requeue for later
      updateJob(jobId, { status: 'PENDING', errorMessage: err?.message, errorCode: 'TRANSIENT' });
      requeue(jobId);
      return;
    }

    if (kind === 'permanent') {
      updateJob(jobId, { status: 'FAILED', errorMessage: err?.message, errorCode: 'PERMANENT' });
      return;
    }

    // manual review
    updateJob(jobId, { status: 'MANUAL_REVIEW', errorMessage: err?.message, errorCode: 'MANUAL' });
  }
}

export function startWorker() {
  // register the job handler
  onJob(async (jobId: string) => {
    try {
      await processJob(jobId);
    } catch (e) {
      console.error('worker processJob error', e);
    }
  });
  // trigger initial processing
  process.nextTick(() => {});
}

// Auto-start worker when module loaded
try {
  startWorker();
} catch (e) {
  console.error('failed to start tx worker', e);
}
