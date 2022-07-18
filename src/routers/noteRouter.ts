import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as noteController from '../controllers/noteController.js';
import validateSchema from '../middlewares/validateSchema.js';
import { noteSchema } from '../schemas/noteSchemas.js';

const noteRouter = Router();

noteRouter.post(
  '/notes/create',
  validateSchema(noteSchema),
  validateTokenMiddleware,
  noteController.createNote
);

noteRouter.get('/notes', validateTokenMiddleware, noteController.getAllNotes);

noteRouter.get(
  '/notes/:noteId',
  validateTokenMiddleware,
  noteController.getNote
);

noteRouter.delete(
  '/notes/:noteId',
  validateTokenMiddleware,
  noteController.deleteNote
);

export default noteRouter;
