import { Router } from 'express';
// import { body } from "express-validator";
import {body} from "express-validator";
import { validate } from '../middleware/validate';
import { login, register, refresh, logout, googleAuth, googleCallback } from '../controllers/auth.controller';

const authRouter = Router();
console.log('Auth routes loaded');

authRouter.post(
  '/register',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 8 }).withMessage('Password min length 8'),
    body('name').optional().isString().trim(),
  ],
  validate,
  register
);

authRouter.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isString().isLength({ min: 1 }),
  ],
  validate,
  login
);

authRouter.post('/refresh', refresh);
authRouter.post('/logout', logout);

authRouter.get('/google', googleAuth);
authRouter.get('/google/callback', googleCallback);

export default authRouter;
