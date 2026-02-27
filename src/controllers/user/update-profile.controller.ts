import { Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { updateProfileService } from '../../services/user/update-profile.service.js';
import { UpdateProfileReq } from '../../types/user/update-profile/update-profile.request.js';
import { UpdateProfileRes } from '../../types/user/update-profile/update-profile.response.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const updateProfile = async (
  req: AuthRequest<{ id: string }, any, UpdateProfileReq>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const updatedUser = await updateProfileService(id, req.body);
    if (!updatedUser) {
      return sendResponse(res, 404, { data: null, message: 'User not found!' });
    }

    return sendResponse<UpdateProfileRes>(res, 200, { data: updatedUser, message: 'Update profile success' });
  } catch (error) {
    next(error);
  }
};
