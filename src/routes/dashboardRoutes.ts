import express from 'express';
import { dashboard } from '../controllers/dashboardController';

export const dashboardRouter = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Data for dashboard
 *     tags:
 *       - dashboard
 *     responses:
 *       200:
 *         description: success
 */
dashboardRouter.get('/', dashboard);
