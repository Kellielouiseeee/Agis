import EventEmitter from 'events';
import { v4 as uuidv4 } from 'uuid';
import { TxJob, createJob, findJobByIdempotency, updateJob } from '../models/txJob';

const emitter = new EventEmitter();
const queue: string[] = [];

export async function enqueueTx(data: Partial<TxJob>): Promise<{ jobId: string }> {
  // idempotency: if idempotencyKey provided, return existing job
  if (data.idempotencyKey) {
    const existing = findJobByIdempotency(data.idempotencyKey);
    if (existing) return { jobId: existing.id };
  }

  const id = uuidv4();
  const now = new Date().toISOString();
  const job: TxJob = createJob({
    id,
    type: (data.type || 'TRANSFER') as TxJob['type'],
    status: 'PENDING',
    chainId: data.chainId ?? 1,
    to: data.to,
    amount: data.amount,
    payload: data.payload,
    attempts: 0,
    maxAttempts: data.maxAttempts ?? 5,
    createdAt: now,
    updatedAt: now,
    idempotencyKey: data.idempotencyKey
  } as TxJob);

  queue.push(id);
  // notify worker
  process.nextTick(() => emitter.emit('job'));
  return { jobId: id };
}

export function onJob(handler: (jobId: string) => Promise<void>) {
  emitter.on('job', async () => {
    // simple FIFO
    while (queue.length > 0) {
      const id = queue.shift();
      if (id) {
        try {
          await handler(id);
        } catch (e) {
          // handler should manage job status
          console.error('job handler error', e);
        }
      }
    }
  });
}

export function requeue(jobId: string) {
  queue.push(jobId);
  process.nextTick(() => emitter.emit('job'));
}

export function getQueueLength() {
  return queue.length;
}
