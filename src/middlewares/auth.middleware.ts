import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User, { IUser } from '../models/user.model.js';
import { sendResponse } from '../utils/response.util.js';

dotenv.config();
const secret = process.env.JWT_SECRET || 'yoursecretkey';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendResponse(res, 401, { data: null, message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret) as { userId: string };

    const user = await User.findById(decoded.userId);
    if (!user) {
      return sendResponse(res, 401, { data: null, message: 'User not found or account deleted' });
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return sendResponse(res, 401, { data: null, message: 'Token expired' });
    }
    return sendResponse(res, 401, { data: null, message: 'Invalid token' });
  }
};
