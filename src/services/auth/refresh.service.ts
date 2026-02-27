import jwt from 'jsonwebtoken';
import RefreshToken from '../../models/token.model.js';
import { generateTokens } from './token.service.js';
import dotenv from 'dotenv';

dotenv.config();
const refreshSecret = process.env.JWT_REFRESH_SECRET || 'yourrefreshsecretkey';

export const refreshService = async (refreshToken: string) => {
  const storedToken = await RefreshToken.findOne({ token: refreshToken });
  if (!storedToken) return 'INVALID_TOKEN';

  try {
    const decoded = jwt.verify(refreshToken, refreshSecret) as { userId: string };

    // Delete old refresh token (Token rotation)
    await RefreshToken.deleteOne({ _id: storedToken._id });

    // Generate new tokens
    return await generateTokens(decoded.userId);
  } catch (error) {
    return 'EXPIRED_OR_INVALID';
  }
};
