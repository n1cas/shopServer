import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers['x-user-id'] as string;
    if (userId) {
      next(); 
    } else {
      res.status(401).json({ message: 'Header x-user-id is missing or no user with such id' });
    }
  };