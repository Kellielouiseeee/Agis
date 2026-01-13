import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export interface AuthRequest extends Request {
  auth?: any;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ ok: false, code: 'ERR_UNAUTHORIZED', message: 'Missing token' });
  const token = auth.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.auth = decoded;
    return next();
  } catch (e: any) {
    return res.status(401).json({ ok: false, code: 'ERR_UNAUTHORIZED', message: 'Invalid token' });
  }
}

export function signToken(payload: any, expiresIn = '1h') {
  // cast to any to satisfy type mismatches in this environment
  return jwt.sign(payload, JWT_SECRET as any, { expiresIn } as any);
}

export default { requireAuth, signToken };
