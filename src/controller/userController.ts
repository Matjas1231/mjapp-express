import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@prisma.io'
      }
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Błąd podczas tworzenia użytkownika:', error);

    res
      .status(500)
      .json({ error: 'Wystąpił błąd podczas tworzenia użytkownika' });
  }
};
