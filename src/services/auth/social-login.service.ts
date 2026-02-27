import User from '../../models/user.model.js';
import { SocialLoginReq } from '../../types/auth/social-login/social-login.request.js';
import { SocialLoginRes } from '../../types/auth/social-login/social-login.response.js';
import { generateTokens } from './token.service.js';

export const socialLoginService = async (
  socialData: SocialLoginReq
): Promise<SocialLoginRes | 'EMAIL_TAKEN'> => {
  const { username, email, uid, provider } = socialData;
  let user = await User.findOne({ uid, provider });

  if (!user) {
    const emailExists = await User.findOne({ email });
    if (emailExists) return 'EMAIL_TAKEN';

    user = new User({ username, email, uid, provider });
    await user.save();
  }

  const { accessToken, refreshToken } = await generateTokens(user._id as string);
  const userResponse = user.toObject();
  delete userResponse.password;

  return {
    accessToken,
    refreshToken,
    user: userResponse,
  };
};
