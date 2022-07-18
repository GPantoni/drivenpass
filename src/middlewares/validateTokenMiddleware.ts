import { Request, Response, NextFunction } from 'express';
import { getSessionById } from '../repositories/authRepository.js';
import * as errorUtils from '../utils/errorUtils.js';

export default async function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    throw errorUtils.errorUnauthorized('Token');
  }

  const session = await getSessionById(token);
  if (!session) {
    throw errorUtils.errorUnauthorized('Invalid/Expired token');
  }

  res.locals.userId = session.userId;
  next();
}
