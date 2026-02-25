import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model.js';

// Get user profile
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
