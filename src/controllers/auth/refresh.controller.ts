import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { refreshService } from '../../services/auth/refresh.service.js';
import { RefreshReq } from '../../types/auth/refresh/refresh.request.js';
import { RefreshRes } from '../../types/auth/refresh/refresh.response.js';

export const refresh = async (
  req: Request<any, any, RefreshReq>,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return sendResponse(res, 400, { data: null, message: 'Refresh token is required!' });
  }

  try {
    const result = await refreshService(refreshToken);
    if (result === 'INVALID_TOKEN' || result === 'EXPIRED_OR_INVALID') {
      return sendResponse(res, 401, { data: null, message: 'Invalid or expired refresh token!' });
    }

    return sendResponse<RefreshRes>(res, 200, {
      data: result,
      message: 'Token refreshed successfully!'
    });
  } catch (error) {
    next(error);
  }
};
