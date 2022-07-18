import { Request, Response, NextFunction } from 'express';
import { getSessionByToken } from '../repositories/authRepository.js';
import * as errorUtils from '../utils/errorUtils.js';

export default async function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    throw errorUtils.errorUnprocessableEntity('Missing token');
  }

  const session = await getSessionByToken(token);
  if (!session) {
    throw errorUtils.errorUnauthorized('Invalid/Expired token');
  }

  res.locals.userId = session.userId;
  next();
}
