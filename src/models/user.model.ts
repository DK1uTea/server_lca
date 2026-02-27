import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username?: string;
  email: string;
  dateOfBirth?: Date;
  gender?: Gender;
  description?: string;
  avatar?: string;
  password?: string;
  uid?: string;
  provider: Provider;
  createdAt: Date;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Provider {
  LOCAL = 'local',
  GOOGLE = 'google',
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: [Gender.MALE, Gender.FEMALE],
    default: Gender.MALE,
  },
  description: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: function (this: IUser) {
      return !this.uid;
    },
    select: false,
  },
  uid: {
    type: String,
    unique: true,
    sparse: true,
  },
  provider: {
    type: String,
    enum: [Provider.LOCAL, Provider.GOOGLE],
    default: Provider.LOCAL,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
