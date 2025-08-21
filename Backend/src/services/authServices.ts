// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface TokenPayload {
  id: string;
  email: string;
}

export function buildAuthTokens(payload: TokenPayload) {
  const accessToken = jwt.sign(payload, env.jwt.accessSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, env.jwt.refreshSecret, { expiresIn: '7d' });

  return { accessToken, refreshToken };
}

export async function rotateRefreshToken(refreshToken: string) {
  try {
    const decoded = jwt.verify(refreshToken, env.jwt.refreshExpires) as TokenPayload;
    // generate new tokens
    return buildAuthTokens({ id: decoded.id, email: decoded.email });
  } catch (err) {
    throw new Error('Invalid refresh token');
  }
}
