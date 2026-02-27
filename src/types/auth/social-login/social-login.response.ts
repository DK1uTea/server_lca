import { IUser } from '../../../models/user.model.js';

export interface SocialLoginRes {
  accessToken: string;
  refreshToken: string;
  user: Partial<IUser>;
}
