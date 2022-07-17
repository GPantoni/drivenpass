import { Request, Response, NextFunction } from 'express';
import * as errorUtils from '../utils/errorUtils.js';
import Jwt, { JwtPayload } from 'jsonwebtoken';

export async function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    throw errorUtils.errorUnauthorized('Token');
  }

  try {
    //Jwt key contains {userId: xxx, name: xxx};
    const userData = Jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const { userId } = userData;
    res.locals.userId = userId;

    next();
  } catch {
    res.sendStatus(401);
  }
}
