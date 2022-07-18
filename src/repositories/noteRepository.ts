import { Note } from '@prisma/client';
import prisma from '../database.js';

export async function createNote(createNoteData: InsertNoteData) {
  return await prisma.note.create({ data: createNoteData });
}

export async function getNoteById(id: number, userId: number) {
  return await prisma.note.findFirst({
    where: { id, userId },
  });
}

export async function getAllNotes(userId: number) {
  return await prisma.note.findMany({ where: { userId } });
}

export async function deleteNote(id: number, userId: number) {
  return await prisma.note.deleteMany({
    where: { id: id, userId: userId },
  });
}

export async function getNoteByTitle(title: string, userId: number) {
  return await prisma.note.findFirst({
    where: {
      title: { equals: title, mode: 'insensitive' },
      userId,
    },
  });
}

export type InsertNoteData = Omit<Note, 'id'>;
