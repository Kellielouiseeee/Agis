import { Request, Response, NextFunction } from 'express';

// Simple in-memory rate limiter for demo/closed-beta
const windows = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 1000 * 10; // 10s window
const LIMIT = 20; // 20 requests per window per key

function keyFor(req: Request) {
  return req.ip || req.headers['x-forwarded-for'] as string || 'anon';
}

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const k = keyFor(req);
  const now = Date.now();
  const entry = windows.get(k);
  if (!entry || entry.resetAt <= now) {
    windows.set(k, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }
  if (entry.count >= LIMIT) {
    res.status(429).json({ ok: false, code: 'ERR_RATE_LIMIT', message: 'Too many requests, try later.' });
    return;
  }
  entry.count += 1;
  windows.set(k, entry);
  return next();
}

export default rateLimiter;
