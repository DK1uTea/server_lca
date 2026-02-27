import bcrypt from 'bcryptjs';
import User from '../../models/user.model.js';
import { LoginReq } from '../../types/auth/login/login.request.js';
import { LoginRes } from '../../types/auth/login/login.response.js';
import { generateTokens } from './token.service.js';

export const loginService = async (loginData: LoginReq): Promise<LoginRes | null> => {
  const { username, password } = loginData;
  const user = await User.findOne({ username }).select('+password');

  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password || '');
  if (!isPasswordValid) return null;

  const { accessToken, refreshToken } = await generateTokens(user._id as string);
  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    accessToken,
    refreshToken,
    user: userResponse,
  };
};
