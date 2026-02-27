import express from 'express';
import { getProfile } from '../controllers/user/get-profile.controller.js';
import { updateProfile } from '../controllers/user/update-profile.controller.js';

const router = express.Router();

// Add user-specific protected routes here
router.get('/profile/:id', getProfile);
router.patch('/profile/:id', updateProfile);

export default router;
