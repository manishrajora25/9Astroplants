import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, 'Not found'));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const error = err as ApiError & { status?: number };
  const status = error.statusCode || error.status || 500;
  const message = (error && error.message) || 'Internal server error';
  
  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({ error: message });
}
