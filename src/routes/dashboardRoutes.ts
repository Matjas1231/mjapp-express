import express from 'express';
import { dashboard } from '../controllers/dashboardController';

export const dashboardRouter = express.Router();

dashboardRouter.get('/', dashboard);
