import * as errorUtils from '../utils/errorUtils.js';
import * as wifiRepository from '../repositories/wifiRepository.js';
import { InsertWifiData } from '../repositories/wifiRepository.js';
import { encryptr, decryptr } from '../utils/cryptrUtils.js';

export async function createWifi(createWifiData: InsertWifiData) {
  const isTitleUnavailable = await wifiRepository.getWifiByTitle(
    createWifiData.title,
    createWifiData.userId
  );
  if (isTitleUnavailable) {
    throw errorUtils.errorForbidden('Title already in use');
  }

  createWifiData = {
    ...createWifiData,
    password: encryptr(createWifiData.password),
  };

  await wifiRepository.createWifi(createWifiData);
}

export async function getWifi(id: number, userId: number) {
  let wifi = await wifiRepository.getWifiById(id, userId);
  if (!wifi) {
    throw errorUtils.errorBadRequest(
      'This wifi does not exists or belongs to another user'
    );
  }

  wifi = {
    ...wifi,
    password: decryptr(wifi.password),
  };

  return wifi;
}

export async function getAllWifis(userId: number) {
  let wifis = await wifiRepository.getAllWifis(userId);
  if (!wifis) {
    throw errorUtils.errorBadRequest('There are no wifis yet');
  }

  wifis = wifis.map((wifi) => {
    return (wifi = {
      ...wifi,
      password: decryptr(wifi.password),
    });
  });

  return wifis;
}

export async function deleteWifi(id: number, userId: number) {
  let wifi = await wifiRepository.getWifiById(id, userId);
  if (!wifi) {
    throw errorUtils.errorBadRequest(
      'This wifi does not exists or belongs to another user'
    );
  }

  await wifiRepository.deleteWifi(id, userId);
}
