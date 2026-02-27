import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { socialLoginService } from '../../services/auth/social-login.service.js';
import { SocialLoginReq } from '../../types/auth/social-login/social-login.request.js';
import { SocialLoginRes } from '../../types/auth/social-login/social-login.response.js';

export const socialLogin = async (
  req: Request<any, any, SocialLoginReq>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await socialLoginService(req.body);
    if (result === 'EMAIL_TAKEN') {
      return sendResponse(res, 400, { data: null, message: 'Email already used by another account!' });
    }

    return sendResponse<SocialLoginRes>(res, 200, {
      data: result,
      message: 'Social login successful!'
    });
  } catch (error) {
    next(error);
  }
};
