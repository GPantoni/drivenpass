import * as errorUtils from '../utils/errorUtils.js';
import * as cardRepository from '../repositories/cardRepository.js';
import { InsertCardData } from '../repositories/cardRepository.js';
import { encryptr, decryptr } from '../utils/cryptrUtils.js';

export async function createCard(createCardData: InsertCardData) {
  const isTitleUnavailable = await cardRepository.getCardByTitle(
    createCardData.title,
    createCardData.userId
  );
  if (isTitleUnavailable) {
    throw errorUtils.errorForbidden('Title already in use');
  }

  createCardData = {
    ...createCardData,
    password: encryptr(createCardData.password),
    securityCode: encryptr(createCardData.securityCode),
  };

  await cardRepository.createCard(createCardData);
}

export async function getCard(id: number, userId: number) {
  let card = await cardRepository.getCardById(id, userId);
  if (!card) {
    throw errorUtils.errorBadRequest(
      'This card does not exists or belongs to another user'
    );
  }

  card = {
    ...card,
    password: decryptr(card.password),
    securityCode: decryptr(card.securityCode),
  };

  return card;
}

export async function getAllCards(userId: number) {
  let cards = await cardRepository.getAllCards(userId);
  if (!cards) {
    throw errorUtils.errorBadRequest('There are no cards yet');
  }

  cards = cards.map((card) => {
    return (card = {
      ...card,
      password: decryptr(card.password),
      securityCode: decryptr(card.securityCode),
    });
  });

  return cards;
}

export async function deleteCard(id: number, userId: number) {
  let card = await cardRepository.getCardById(id, userId);
  if (!card) {
    throw errorUtils.errorBadRequest(
      'This card does not exists or belongs to another user'
    );
  }

  await cardRepository.deleteCard(id, userId);
}
