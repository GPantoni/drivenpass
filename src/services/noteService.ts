import * as errorUtils from '../utils/errorUtils.js';
import * as noteRepository from '../repositories/noteRepository.js';
import { InsertNoteData } from '../repositories/noteRepository.js';

export async function createNote(createNoteData: InsertNoteData) {
  const isTitleUnavailable = await noteRepository.getNoteByTitle(
    createNoteData.title,
    createNoteData.userId
  );
  if (isTitleUnavailable) {
    throw errorUtils.errorForbidden('Title already in use');
  }

  await noteRepository.createNote(createNoteData);
}

export async function getNote(id: number, userId: number) {
  let note = await noteRepository.getNoteById(id, userId);
  if (!note) {
    throw errorUtils.errorBadRequest(
      'This note does not exists or belongs to another user'
    );
  }

  return note;
}

export async function getAllNotes(userId: number) {
  let notes = await noteRepository.getAllNotes(userId);
  if (!notes) {
    throw errorUtils.errorBadRequest('There are no notes yet');
  }

  return notes;
}

export async function deleteNote(id: number, userId: number) {
  let note = await noteRepository.getNoteById(id, userId);
  if (!note) {
    throw errorUtils.errorBadRequest(
      'This note does not exists or belongs to another user'
    );
  }

  await noteRepository.deleteNote(id, userId);
}
