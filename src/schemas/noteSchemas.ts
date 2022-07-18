import Joi from 'joi';
import { Note } from '@prisma/client';

export const noteSchema = Joi.object<Note>({
  title: Joi.string().max(50).required(),
  note: Joi.string().max(1000).required(),
});
