import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as cardController from '../controllers/cardController.js';

const cardRouter = Router();

cardRouter.post(
  '/cards/create',
  validateTokenMiddleware,
  cardController.createCard
);

cardRouter.get('/cards', validateTokenMiddleware, cardController.getAllCards);

cardRouter.get(
  '/cards/:cardId',
  validateTokenMiddleware,
  cardController.getCard
);

cardRouter.delete(
  '/cards/:cardId',
  validateTokenMiddleware,
  cardController.deleteCard
);

export default cardRouter;
