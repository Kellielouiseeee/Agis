import { Router } from 'express';

const router = Router();

router.get('/ping', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

router.get('/', (_req, res) => {
  res.json({ service: 'agis-backend', status: 'running' });
});

export default router;
