import { Request, Response } from 'express';

export const dashboard = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: 'Hello from dashboard'
    });
  } catch (error) {
    console.error('Błąd podczas ładowania dashboard:', error);
  }
};
