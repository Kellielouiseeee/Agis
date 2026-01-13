import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'username required' });
  // minimal: return a user id
  return res.json({ id: `user_${Date.now()}`, username });
});

export { router as registerRouter };
