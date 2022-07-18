import { Card } from '@prisma/client';
import prisma from '../database.js';

export async function createCard(createCardData: InsertCardData) {
  return await prisma.card.create({ data: createCardData });
}

export async function getCardById(id: number, userId: number) {
  return await prisma.card.findFirst({
    where: { id, userId },
  });
}

export async function getAllCards(userId: number) {
  return await prisma.card.findMany({ where: { userId } });
}

export async function deleteCard(id: number, userId: number) {
  return await prisma.card.deleteMany({
    where: { id: id, userId: userId },
  });
}

export async function getCardByTitle(title: string, userId: number) {
  return await prisma.card.findFirst({
    where: {
      title: { equals: title, mode: 'insensitive' },
      userId,
    },
  });
}

export type InsertCardData = Omit<Card, 'id'>;
