import Joi from 'joi';
import { Card } from '@prisma/client';

export const cardSchema = Joi.object<Card>({
  title: Joi.string().required(),
  number: Joi.string().creditCard().required(),
  cardHolder: Joi.string().required(),
  password: Joi.string().required(),
  securityCode: Joi.string().required(),
  expiration: Joi.string()
    .pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)
    .required(),
  type: Joi.string().valid('credit', 'debit', 'both').required(),
  isVirtual: Joi.boolean().required(),
});
