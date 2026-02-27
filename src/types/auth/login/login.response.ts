import { IUser } from '../../../models/user.model.js';

export interface LoginRes {
  accessToken: string;
  refreshToken: string;
  user: Partial<IUser>;
}
