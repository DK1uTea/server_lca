import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/response.util.js';
import { registerService } from '../../services/auth/register.service.js';
import { RegisterReq } from '../../types/auth/register/register.request.js';
import { RegisterRes } from '../../types/auth/register/register.response.js';

export const register = async (
  req: Request<any, any, RegisterReq>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await registerService(req.body);
    if (result === 'EMAIL_EXISTS') {
      return sendResponse(res, 400, { data: null, message: `Email already exists!` });
    }

    return sendResponse<RegisterRes>(res, 201, { data: result, message: 'User registered successfully!' });
  } catch (error) {
    next(error);
  }
};
