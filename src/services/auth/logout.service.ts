import RefreshToken from '../../models/token.model.js';

export const logoutService = async (refreshToken?: string) => {
  if (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }
  return true;
};
