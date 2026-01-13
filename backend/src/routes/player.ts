import { Router } from 'express';
import contractService from '../services/contractService';

const router = Router();

router.get('/:address/xp', async (req, res) => {
  const { address } = req.params;
  if (!address) return res.status(400).json({ ok: false, code: 'ERR_INVALID_INPUT', message: 'address required' });
  try {
    const xp = await contractService.getPlayerXP(address);
    return res.json({ ok: true, address, xp });
  } catch (e: any) {
    console.error('get xp error', e);
    return res.status(500).json({ ok: false, code: 'ERR_INTERNAL', message: e?.message ?? 'internal' });
  }
});

export default router;
