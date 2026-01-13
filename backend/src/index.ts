import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import gameRoutes from './routes/game';
import rewardsRoutes from './routes/rewards';
import statusRoutes from './routes/status';

// initialize environment and services
dotenv.config();
import './services/contractService';
import './workers/txWorker';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/game', gameRoutes);
app.use('/rewards', rewardsRoutes);
app.use('/status', statusRoutes);

app.get('/', (_req, res) => res.json({ service: 'agis-backend', status: 'ok' }));

app.use((err: any, _req: express.Request, res: express.Response, _next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`AGIS backend listening on http://localhost:${PORT}`);
});

export default app;
