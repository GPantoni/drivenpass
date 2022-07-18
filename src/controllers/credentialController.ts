import { Request, Response } from 'express';
import * as credentialService from '../services/credentialServices.js';
import { InsertCredentialData } from '../repositories/credentialRepository';

export async function createCredential(req: Request, res: Response) {
  const { userId, title, url, username, password } = req.body;

  const credentialData: InsertCredentialData = {
    userId,
    title,
    url,
    username,
    password,
  };

  await credentialService.createCredential(credentialData);

  res.sendStatus(201);
}

export async function getCredential(req: Request, res: Response) {
  const { userId } = req.body;
  const id = parseInt(req.params.credentialId);

  const credential = await credentialService.getCredential(id, userId);

  res.status(200).send(credential);
}

export async function getAllCredentials(req: Request, res: Response) {
  const { userId } = req.body;

  const credentials = await credentialService.getAllCredentials(userId);

  res.status(200).send(credentials);
}

export async function deleteCredential(req: Request, res: Response) {
  const { userId } = req.body;
  const id = parseInt(req.params.credentialId);

  await credentialService.deleteCredential(id, userId);

  res.sendStatus(200);
}
