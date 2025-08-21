import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import '../src/config/Passport';
import { logger } from './config/Logger';
import { notFound, errorHandler } from './middleware/error';
import { env } from './config/env';

import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.route';

const app = express();

app.use(helmet());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

app.get('/health', (_req, res) => res.json({ ok: true }));
console.log('Registering /api routes');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
