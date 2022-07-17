import Joi from 'joi';
import { SignUserData } from '../services/authService';

export const signSchema = Joi.object<SignUserData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});
