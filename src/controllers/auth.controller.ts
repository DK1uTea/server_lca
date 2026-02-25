import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();
const secret = process.env.JWT_SECRET || 'yoursecretkey';

// Traditional login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || '');
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password!' });
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    const userResponse = user.toObject();
    delete userResponse.password;
    return res.status(200).json({ token, user: userResponse, message: 'Login successful!' });
  } catch (error) {
    next(error);
  }
};

// Traditional register
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: `Email already exists!` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      provider: 'local',
    });
    await user.save();
    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    next(error);
  }
};

// Social login
export const socialLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, uid, provider } = req.body;

  if (!email || !uid || !provider) {
    return res.status(400).json({ message: 'Missing required fields for social login' });
  }

  try {
    let user = await User.findOne({ uid, provider });

    if (!user) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already used by another account!' });
      }

      user = new User({ username, email, uid, provider });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
    const userResponse = user.toObject();
    delete userResponse.password;
    return res.status(200).json({ token, user: userResponse, message: 'Social login successful!' });
  } catch (error) {
    next(error);
  }
};
