import express from 'express';
import authRouter from './auth.router.js';
import taskRouter from './task.router.js';
import userRouter from './user.router.js';
import transactionRouter from './transaction.router.js';
import habitRouter from './habit.router.js';

const router = express.Router();

const publicRoutes = [
  { path: '/auth', router: authRouter },
];

const privateRoutes = [
  { path: '/tasks', router: taskRouter },
  { path: '/users', router: userRouter },
  { path: '/transactions', router: transactionRouter },
  { path: '/habits', router: habitRouter },
];

publicRoutes.forEach((route) => router.use(route.path, route.router));
privateRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
