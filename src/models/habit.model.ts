import mongoose, { Schema, Document } from "mongoose";

export interface IHabit extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  targetCount: number;
  completedDates: Date[];
  createdAt: Date;
}

const habitSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
  completedDates: {
    type: [Date],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Habit = mongoose.model<IHabit>('Habit', habitSchema);
export default Habit;
