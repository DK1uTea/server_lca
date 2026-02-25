import express from 'express';
import { login, register, socialLogin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/social-login', socialLogin);

export default router;
