import { Request, Response } from 'express';
import * as wifiService from '../services/wifiService.js';
import { InsertWifiData } from '../repositories/wifiRepository.js';

export async function createWifi(req: Request, res: Response) {
  const { userId } = res.locals;

  const wifiData: InsertWifiData = {
    userId,
    ...req.body,
  };

  await wifiService.createWifi(wifiData);

  res.sendStatus(201);
}

export async function getWifi(req: Request, res: Response) {
  const { userId } = res.locals;
  const id = parseInt(req.params.wifiId);

  const wifi = await wifiService.getWifi(id, userId);

  res.status(200).send(wifi);
}

export async function getAllWifis(req: Request, res: Response) {
  const { userId } = res.locals;

  const wifis = await wifiService.getAllWifis(userId);

  res.status(200).send(wifis);
}

export async function deleteWifi(req: Request, res: Response) {
  const { userId } = res.locals;
  const id = parseInt(req.params.wifiId);

  await wifiService.deleteWifi(id, userId);

  res.sendStatus(200);
}
