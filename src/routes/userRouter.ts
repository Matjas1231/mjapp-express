import express from 'express';
import { createUser, getAllUsers } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.get('/', getAllUsers);

userRouter.post('/create', createUser);
