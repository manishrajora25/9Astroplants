import { Router } from 'express';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.routes';

const router = Router();
console.log('Index routes mounted');
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
