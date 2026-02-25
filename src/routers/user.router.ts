import express from 'express';
import { getProfile } from '../controllers/user.controller.js';

const router = express.Router();

// Add user-specific protected routes here
router.get('/profile/:id', getProfile);

export default router;
