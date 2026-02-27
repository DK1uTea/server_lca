import { Gender } from '../../../models/user.model.js';

export interface UpdateProfileReq {
  username?: string;
  dateOfBirth?: Date;
  gender?: Gender;
  description?: string;
  avatar?: string;
}
