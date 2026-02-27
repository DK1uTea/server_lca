import jwt from 'jsonwebtoken';
import RefreshToken from '../../models/token.model.js';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET || 'yoursecretkey';
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'yourrefreshsecretkey';

export const generateTokens = async (userId: string) => {
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
