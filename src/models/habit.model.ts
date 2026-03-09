import mongoose, { Schema, Document } from "mongoose";

export interface IHabit extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  targetCount: number;
  streak: {
    current: number;
    longest: number;
    lastCompletedDate: Date | null;
  };
  createdAt: Date;
}

const habitSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily',
  },
  targetCount: {
    type: Number,
    default: 1,
  },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastCompletedDate: { type: Date, default: null },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Habit = mongoose.model<IHabit>('Habit', habitSchema);
export default Habit;
