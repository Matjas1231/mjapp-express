import express from 'express';
import { createUser, getAllUsers } from '../controllers/userController';

export const usersRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: Fetched Users
 */
usersRouter.get('/', getAllUsers);

/**
 * @swagger
 * /users/create:
 *   post:
 *     description: Create user
 *     tags:
 *       - users
 *     responses:
 *       201:
 *         description: Creating user
 */
usersRouter.post('/create', createUser);
