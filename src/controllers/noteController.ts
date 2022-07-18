import { Request, Response } from 'express';
import * as noteService from '../services/noteService.js';
import { InsertNoteData } from '../repositories/noteRepository.js';

export async function createNote(req: Request, res: Response) {
  const { userId } = res.locals;

  const noteData: InsertNoteData = {
    userId,
    ...req.body,
  };

  await noteService.createNote(noteData);

  res.sendStatus(201);
}

export async function getNote(req: Request, res: Response) {
  const { userId } = res.locals;
  const id = parseInt(req.params.noteId);

  const note = await noteService.getNote(id, userId);

  res.status(200).send(note);
}

export async function getAllNotes(req: Request, res: Response) {
  const { userId } = res.locals;

  const notes = await noteService.getAllNotes(userId);

  res.status(200).send(notes);
}

export async function deleteNote(req: Request, res: Response) {
  const { userId } = res.locals;
  const id = parseInt(req.params.noteId);

  await noteService.deleteNote(id, userId);

  res.sendStatus(200);
}
