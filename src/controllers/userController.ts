import { Request, Response } from 'express';
import { User } from '../models/User';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  console.log(users);

  res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create({
      username: 'exampleUser',
      email: 'user@example.com'
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Błąd podczas tworzenia użytkownika:', error);
    res
      .status(500)
      .json({ error: 'Wystąpił błąd podczas tworzenia użytkownika' });
  }
};
