import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { getProfileService } from '../../services/user/get-profile.service.js';
import { GetProfileReq } from '../../types/user/get-profile/get-profile.request.js';
import { GetProfileRes } from '../../types/user/get-profile/get-profile.response.js';

import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.user?._id as string;

  try {
    const userData = await getProfileService(id);
    if (!userData) {
      return sendResponse(res, 404, { data: null, message: 'User not found!' });
    }

    return sendResponse<GetProfileRes>(res, 200, { data: userData, message: 'Get profile success' });
  } catch (error) {
    next(error);
  }
};
