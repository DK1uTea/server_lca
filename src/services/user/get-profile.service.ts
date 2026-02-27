import User from '../../models/user.model.js';
import { GetProfileRes } from '../../types/user/get-profile/get-profile.response.js';

export const getProfileService = async (id: string): Promise<GetProfileRes | null> => {
  const user = await User.findById(id);
  if (!user) return null;

  const userData = user.toObject();
  delete userData.password;
  return userData;
};
