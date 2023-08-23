import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { SECRET_KEY } from '../config';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (typeof decoded === 'object' && 'userId' in decoded) {
        req.userId = (decoded as JwtPayload & { userId: string }).userId;
        next();
      } else {
        res.status(401).send('Invalid token');
      }
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};
