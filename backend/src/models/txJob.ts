export type TxType = 'TRANSFER' | 'REWARD' | 'GAME_RESULT' | string;

export type TxStatus = 'PENDING' | 'PROCESSING' | 'CONFIRMED' | 'FAILED' | 'MANUAL_REVIEW';

export interface TxJob {
  id: string;
  type: TxType;
  status: TxStatus;
  chainId: number;
  to?: string;
  amount?: string; // bigint as string
  payload?: any; // free-form JSON metadata
  txHash?: string;
  errorCode?: string;
  errorMessage?: string;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  updatedAt: string;
  lastAttemptAt?: string;
  idempotencyKey?: string;
}

// In-memory store for tx jobs (for dev). Replace with persistent DB in production.
const jobs = new Map<string, TxJob>();

export function createJob(job: TxJob) {
  jobs.set(job.id, job);
  return job;
}

export function updateJob(id: string, patch: Partial<TxJob>) {
  const j = jobs.get(id);
  if (!j) return null;
  const updated = { ...j, ...patch, updatedAt: new Date().toISOString() } as TxJob;
  jobs.set(id, updated);
  return updated;
}

export function getJob(id: string) {
  return jobs.get(id) ?? null;
}

export function findJobByIdempotency(key: string) {
  for (const j of jobs.values()) {
    if (j.idempotencyKey === key) return j;
  }
  return null;
}

export function listJobs() {
  return Array.from(jobs.values());
}
