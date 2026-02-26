import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import RefreshToken from '../models/token.model.js';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { sendResponse } from '../utils/response.util.js';

dotenv.config();
const secret = process.env.JWT_SECRET || 'yoursecretkey';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'yourrefreshsecretkey';

const generateTokens = async (userId: string) => {
  const accessToken = jwt.sign({ userId }, secret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId }, refreshSecret, { expiresIn: '7d' });

  // Save refresh token to DB
  await RefreshToken.create({
    userId,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  return { accessToken, refreshToken };
};

// Traditional login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return sendResponse(res, 404, { data: null, message: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || '');
    if (!isPasswordValid) {
      return sendResponse(res, 401, { data: null, message: 'Invalid username or password!' });
    }

    const { accessToken, refreshToken } = await generateTokens(user._id as string);
    const userResponse = user.toObject();
    delete userResponse.password;

    return sendResponse(res, 200, {
      data: {
        accessToken,
        refreshToken,
        user: userResponse,
      },
      message: 'Login successful!'
    });
  } catch (error) {
    next(error);
  }
};

// Traditional register
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, { data: null, message: `Email already exists!` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      provider: 'local',
    });
    await user.save();
    return sendResponse(res, 201, { data: user, message: 'User registered successfully!' });
  } catch (error) {
    next(error);
  }
};

// Social login
export const socialLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, uid, provider } = req.body;

  if (!email || !uid || !provider) {
    return sendResponse(res, 400, { data: null, message: 'Missing required fields for social login' });
  }

  try {
    let user = await User.findOne({ uid, provider });

    if (!user) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return sendResponse(res, 400, { data: null, message: 'Email already used by another account!' });
      }

      user = new User({ username, email, uid, provider });
      await user.save();
    }

    const { accessToken, refreshToken } = await generateTokens(user._id as string);
    const userResponse = user.toObject();
    delete userResponse.password;

    return sendResponse(res, 200, {
      data: {
        accessToken,
        refreshToken,
        user: userResponse,
      },
      message: 'Social login successful!'
    });
  } catch (error) {
    next(error);
  }
};

// Refresh token
export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return sendResponse(res, 400, { data: null, message: 'Refresh token is required!' });
  }

  try {
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken) {
      return sendResponse(res, 401, { data: null, message: 'Invalid refresh token!' });
    }

    const decoded = jwt.verify(refreshToken, refreshSecret) as { userId: string };

    // Delete old refresh token (Token rotation)
    await RefreshToken.deleteOne({ _id: storedToken._id });

    // Generate new tokens
    const tokens = await generateTokens(decoded.userId);

    return sendResponse(res, 200, {
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
      message: 'Token refreshed successfully!'
    });
  } catch (error) {
    return sendResponse(res, 401, { data: null, message: 'Invalid or expired refresh token!' });
  }
};

// Logout
export const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;

  try {
    if (refreshToken) {
      await RefreshToken.deleteOne({ token: refreshToken });
    }
    return sendResponse(res, 200, { data: null, message: 'Logged out successfully!' });
  } catch (error) {
    next(error);
  }
};
