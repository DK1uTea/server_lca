import User from '../../models/user.model.js';
import { UpdateProfileReq } from '../../types/user/update-profile/update-profile.request.js';
import { UpdateProfileRes } from '../../types/user/update-profile/update-profile.response.js';

export const updateProfileService = async (
  id: string,
  updateData: UpdateProfileReq
): Promise<UpdateProfileRes | null> => {
  const user = await User.findById(id);
  if (!user) return null;

  const { username, dateOfBirth, gender, description, avatar } = updateData;

  username && (user.username = username);
  dateOfBirth && (user.dateOfBirth = dateOfBirth);
  gender && (user.gender = gender);
  description && (user.description = description);
  avatar && (user.avatar = avatar);

  await user.save();
  return user.toObject();
};
