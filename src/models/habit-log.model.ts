import mongoose, { Schema, Document } from 'mongoose';

export interface IHabitLog extends Document {
  habitId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  date: Date;
  createdAt: Date;
}

const habitLogSchema: Schema = new Schema({
  habitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for faster lookups
habitLogSchema.index({ habitId: 1, date: 1 }, { unique: true });
habitLogSchema.index({ userId: 1, date: 1 });

const HabitLog = mongoose.model<IHabitLog>('HabitLog', habitLogSchema);
export default HabitLog;
