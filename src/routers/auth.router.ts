import express from 'express';
import { login, register, socialLogin, refresh, logout } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/social-login', socialLogin);
router.post('/refresh', authMiddleware as any, refresh);
router.post('/logout', authMiddleware as any, logout);

export default router;
