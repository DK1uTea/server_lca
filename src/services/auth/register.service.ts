import bcrypt from 'bcryptjs';
import User from '../../models/user.model.js';
import { RegisterReq } from '../../types/auth/register/register.request.js';
import { RegisterRes } from '../../types/auth/register/register.response.js';

export const registerService = async (registerData: RegisterReq): Promise<RegisterRes | 'EMAIL_EXISTS'> => {
  const { username, email, password } = registerData;

  const existingUser = await User.findOne({ email });
  if (existingUser) return 'EMAIL_EXISTS';

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
    provider: 'local',
  });

  await user.save();
  return user.toObject();
};
