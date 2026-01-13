import { Router } from 'express';
import contractService from '../services/contractService';

const router = Router();

// GET /rewards/balance/:address
router.get('/balance/:address', async (req, res) => {
  const { address } = req.params;
  if (!address) return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'address required' });
  try {
    const summary = await contractService.getRewards(address);
    return res.json({ ok: true, address, pending: summary.pending, claimable: summary.claimable });
  } catch (e: any) {
    console.error('rewards balance error', e);
    return res.status(500).json({ ok: false, code: 'ERR_INTERNAL', message: e?.message ?? 'internal' });
  }
});

// POST /rewards/claim
router.post('/claim', async (req, res) => {
  const { address, amount, to } = req.body;
  if (!address || !amount || !to) return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'address, amount and to address required' });
  try {
    const bnAmount = typeof amount === 'string' ? BigInt(amount) : BigInt(Number(amount));
    const job = await contractService.queueTransferTokens(to, bnAmount, { user: address });
    return res.status(202).json({ ok: true, queued: true, jobId: job.jobId, expectedProcessing: 'soon' });
  } catch (e: any) {
    console.error('rewards claim error', e);
    return res.status(500).json({ ok: false, code: 'ERR_INTERNAL', message: e?.message ?? 'internal' });
  }
});

export default router;
