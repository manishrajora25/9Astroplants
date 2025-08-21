import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

type AccessPayload = { sub: string; email: string };

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const payload = jwt.verify(token, env.jwt.accessSecret) as AccessPayload;
    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch (_e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
