import { Router } from 'express';
import { getJob } from '../models/txJob';

const router = Router();

router.get('/status/:jobId', (req, res) => {
  const { jobId } = req.params;
  if (!jobId) return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'jobId required' });
  const job = getJob(jobId);
  if (!job) return res.status(404).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'job not found' });
  return res.json({ ok: true, jobId: job.id, status: job.status, txHash: job.txHash, attempts: job.attempts, error: job.errorMessage });
});

export default router;
