import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { loginService } from '../../services/auth/login.service.js';
import { LoginReq } from '../../types/auth/login/login.request.js';
import { LoginRes } from '../../types/auth/login/login.response.js';

export const login = async (
  req: Request<any, any, LoginReq>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await loginService(req.body);
    if (!result) {
      return sendResponse(res, 401, { data: null, message: 'Invalid username or password!' });
    }

    return sendResponse<LoginRes>(res, 200, {
      data: result,
      message: 'Login successful!'
    });
  } catch (error) {
    next(error);
  }
};
