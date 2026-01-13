# Backend Queue and Signing

This document explains how the backend writes are queued and signed.

Overview:
- API handlers create jobs via `contractService.queueTransferTokens` or `contractService.queueRecordGameResult`.
- Jobs are stored in an in-memory store (dev) at `backend/src/models/txJob.ts` and queued via `backend/src/queues/txQueue.ts`.
- Worker `backend/src/workers/txWorker.ts` processes jobs, calls the appropriate contract method, and updates job status.
- Signing is handled by `backend/src/services/signingService.ts` which in DEV mode uses `SERVER_PRIVATE_KEY` and in PROD should be replaced by a KMS/HSM implementation.

How to run worker locally:

```bash
# start backend normally (worker auto-starts on import)
cd backend
npm run dev
```

How to inspect jobs (dev):
- Currently jobs are in-memory. You can add a quick endpoint to list jobs or introspect via logs.

Notes for production:
- Replace in-memory job store with a persistent DB (Postgres) + Redis queue (Bull).
- Wire `signingService` to AWS KMS / Azure Key Vault or HSM.
- Add durable retries, backoff, and alerting for failed jobs.
