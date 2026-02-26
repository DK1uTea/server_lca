import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model.js';
import { sendResponse } from '../utils/response.util.js';

// Get user profile
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return sendResponse(res, 404, { data: null, message: 'User not found!' });
    }

    // Convert to plain object to handle any post-processing if needed
    const userData = user.toObject();
    delete userData.password;

    return sendResponse(res, 200, { data: userData, message: 'Get profile success' });
  } catch (error) {
    next(error);
  }
};
