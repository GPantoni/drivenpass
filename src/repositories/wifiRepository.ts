import { Wifi } from '@prisma/client';
import prisma from '../database.js';

export async function createWifi(createWifiData: InsertWifiData) {
  return await prisma.wifi.create({ data: createWifiData });
}

export async function getWifiById(id: number, userId: number) {
  return await prisma.wifi.findFirst({
    where: { id, userId },
  });
}

export async function getAllWifis(userId: number) {
  return await prisma.wifi.findMany({ where: { userId } });
}

export async function deleteWifi(id: number, userId: number) {
  return await prisma.wifi.deleteMany({
    where: { id: id, userId: userId },
  });
}

export async function getWifiByTitle(title: string, userId: number) {
  return await prisma.wifi.findFirst({
    where: {
      title: { equals: title, mode: 'insensitive' },
      userId,
    },
  });
}

export type InsertWifiData = Omit<Wifi, 'id'>;
