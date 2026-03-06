import { NextFunction, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware.js";
import { updateTimezoneService } from "../../services/user/update-timezone.service.js";
import { sendResponse } from "../../utils/response.util.js";

export type UpdateTimezoneReq = {
  timezone: string;
}

export const updateTimezone = async (
  req: AuthRequest<any, any, UpdateTimezoneReq>,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id as string;
  try {
    const updatedUser = await updateTimezoneService(userId, req.body);
    if (!updatedUser) {
      return sendResponse(res, 404, { data: null, message: 'User not found!' });
    }
    return sendResponse(res, 200, { data: updatedUser, message: 'Update timezone successfully' });
  } catch (error) {
    next(error)
  }
}