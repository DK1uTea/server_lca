import express from 'express';
import { login } from '../controllers/auth/login.controller.js';
import { register } from '../controllers/auth/register.controller.js';
import { socialLogin } from '../controllers/auth/social-login.controller.js';
import { refresh } from '../controllers/auth/refresh.controller.js';
import { logout } from '../controllers/auth/logout.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js';

const router = express.Router();

router.post('/login', validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);
router.post('/social-login', socialLogin);
router.post('/refresh', refresh);
router.post('/logout', authMiddleware, logout);

export default router;
