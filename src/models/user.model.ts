import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username?: string;
  email: string;
  password?: string;
  uid?: string;
  provider: 'local' | 'google';
  createdAt: Date;
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
  password: {
    type: String,
    required: function (this: IUser) {
      return !this.uid;
    },
  },
  uid: {
    type: String,
    unique: true,
    sparse: true,
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
