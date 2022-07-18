import Joi from 'joi';
import { InsertCredentialData } from '../repositories/credentialRepository.js';

export const credentialSchema = Joi.object<InsertCredentialData>({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
