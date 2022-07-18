import { Credential } from '@prisma/client';
import prisma from '../database.js';

export async function createCredential(
  createCredentialData: InsertCredentialData
) {
  return await prisma.credential.create({ data: createCredentialData });
}

export async function getCredentialById(id: number, userId: number) {
  return await prisma.credential.findFirst({
    where: { id, userId },
  });
}

export async function getAllCredentials(userId: number) {
  return await prisma.credential.findMany({ where: { userId } });
}

export async function deleteCredential(id: number, userId: number) {
  return await prisma.credential.deleteMany({
    where: { id: id, userId: userId },
  });
}

export async function getCredentialByTitle(title: string, userId: number) {
  return await prisma.credential.findFirst({
    where: {
      title: { equals: title, mode: 'insensitive' },
      userId,
    },
  });
}

export type InsertCredentialData = Omit<Credential, 'id'>;

export type SearchCredential = Omit<
  Credential,
  'title' | 'url' | 'username' | 'password'
>;
