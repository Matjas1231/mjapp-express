import { Request, Response } from 'express';
import dataSource from '../data-source';
import { User } from '../entity/User';

const userRepository = dataSource.getRepository(User);

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new User();
    newUser.email = 'timte@d.pl';
    newUser.username = 'dddd';

    await userRepository.save(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Błąd podczas tworzenia użytkownika:', error);

    res
      .status(500)
      .json({ error: 'Wystąpił błąd podczas tworzenia użytkownika' });
  }
};
