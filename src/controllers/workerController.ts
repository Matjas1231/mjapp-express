import { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { validationResult } from 'express-validator';
import { CreateWorkerRequest, Meta, UpdateWorkerRequest } from '../types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { validateLimit, validatePageNumber } from '../validators/paginationValidator';
import { createWorkerValidator, updateWorkerValidator, validateId } from '../validators/workerValidator';

export const getAllWorkers = async (req: Request, res: Response) => {
  await Promise.all([validatePageNumber.run(req), validateLimit.run(req)]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { page = 1, limit = 50 } = req.query;

  let parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(limit as string, 10);

  try {
    const [totalWorkers, workers] = await prisma.$transaction([
      prisma.worker.count(),
      prisma.worker.findMany({
        take: parsedLimit,
        skip: (parsedPage - 1) * parsedLimit
      })
    ]);

    if (totalWorkers < 1) {
      return res.sendStatus(204);
    }

    const totalPages = Math.ceil(totalWorkers / parsedLimit);

    if (parsedPage > totalPages) {
      parsedPage = totalPages;
    }

    const meta: Meta = {
      total_items: totalWorkers,
      total_pages: totalPages,
      current_page: parsedPage
    };

    if (parsedPage < totalPages) {
      meta.next_page = `${req.protocol}://${req.get('host')}${req.path}?page=${parsedPage + 1}&limit=${limit}`;
    }

    if (parsedPage > 1) {
      meta.prev_page = `${req.protocol}://${req.get('host')}${req.path}?page=${parsedPage - 1}&limit=${limit}`;
    }

    return res.status(200).json({
      meta,
      data: workers
    });
  } catch (error) {
    console.error('Error while downloading workers', error);

    res.status(500).json({ error: 'Error while downloading workers' });
  }
};

export const getWorkerById = async (req: Request, res: Response) => {
  await validateId.run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id: number = parseInt(req.params.id);

  try {
    const worker = await prisma.worker.findFirstOrThrow({
      where: {
        id: id
      }
    });

    return res.status(200).send(worker);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Worker not found');
      return res.sendStatus(404);
    }

    res.status(500).json({ error: 'Error while downloading worker' });
  }
};

export const createWorker = async (req: Request, res: Response) => {
  await Promise.all(createWorkerValidator.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { department_name, ...restData } = req.body as CreateWorkerRequest;
  const department = department_name || null;

  try {
    const worker = await prisma.worker.create({
      data: {
        ...restData,
        department_name: department
      }
    });

    return res.status(201).send(worker);
  } catch (error) {
    console.error('Error while creating worker', error);

    res.status(500).json({ error: 'Error while creating worker' });
  }
};

export const updateWorker = async (req: Request, res: Response) => {
  await Promise.all(updateWorkerValidator.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id: number = parseInt(req.params.id);

  const { department_name, ...restData } = req.body as UpdateWorkerRequest;
  const department = department_name || null;

  try {
    const worker = await prisma.worker.update({
      where: {
        id: id
      },
      data: {
        ...restData,
        department_name: department
      }
    });

    return res.status(200).send(worker);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Errow while updating worker');
      return res.sendStatus(404);
    }

    return res.status(500).json({ error: 'Error while updating worker' });
  }
};

export const deleteWorkerById = async (req: Request, res: Response) => {
  await validateId.run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id: number = parseInt(req.params.id);

  try {
    await prisma.worker.delete({
      where: {
        id: id
      }
    });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.error('Errow while deleting worker');
      return res.sendStatus(404);
    }
    return res.status(500).json({ error: 'Error while deleting worker' });
  }
};
