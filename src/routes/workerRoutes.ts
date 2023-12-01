import express from 'express';
import {
  createWorker,
  deleteWorkerById,
  getAllWorkers,
  getWorkerById,
  updateWorker
} from '../controllers/workerController';

export const workersRouter = express.Router();

workersRouter.get('/', getAllWorkers);
workersRouter.post('/', createWorker);

workersRouter.get('/:id', getWorkerById);
workersRouter.patch('/:id', updateWorker);
workersRouter.delete('/:id', deleteWorkerById);
