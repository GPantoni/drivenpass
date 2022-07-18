import prisma from '../database.js';
import { SignUserData } from '../services/authService.js';
import { Session } from '@prisma/client';

export async function createUser(createUserData: SignUserData) {
  return await prisma.user.create({
    data: createUserData,
  });
}

export async function findUserByEmail(userEmail: string) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
}

export async function createSession(sessionData: CreateSessionData) {
  return await prisma.session.create({ data: sessionData });
}

export async function getSessionById(token: string) {
  return await prisma.session.findUnique({ where: { token } });
}

type CreateSessionData = Omit<Session, 'id'>;
