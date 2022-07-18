import { Request, Response } from 'express';
import * as cardService from '../services/cardService.js';
import { InsertCardData } from '../repositories/cardRepository.js';

export async function createCard(req: Request, res: Response) {
  const { userId } = res.locals;

  const cardData: InsertCardData = {
    userId,
    ...req.body,
  };

  await cardService.createCard(cardData);

  res.sendStatus(201);
}

export async function getCard(req: Request, res: Response) {
  const { userId } = res.locals;
  const id = parseInt(req.params.cardId);

  const card = await cardService.getCard(id, userId);

  res.status(200).send(card);
}

export async function getAllCards(req: Request, res: Response) {
  const { userId } = res.locals;

  const cards = await cardService.getAllCards(userId);

  res.status(200).send(cards);
}

export async function deleteCard(req: Request, res: Response) {
  const { userId } = res.locals;
  const id = parseInt(req.params.cardId);

  await cardService.deleteCard(id, userId);

  res.sendStatus(200);
}
