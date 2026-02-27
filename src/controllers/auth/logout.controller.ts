import { Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { logoutService } from '../../services/auth/logout.service.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;

  try {
    await logoutService(refreshToken);
    return sendResponse(res, 200, { data: null, message: 'Logged out successfully!' });
  } catch (error) {
    next(error);
  }
};
