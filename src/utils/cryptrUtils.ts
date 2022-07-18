import Cryptr from 'cryptr';
import dotenv from 'dotenv';
dotenv.config();

export function encryptr(entity: string) {
  const cryptr = new Cryptr(process.env.CRYPTR);
  const encryptedString = cryptr.encrypt(entity);
  return encryptedString;
}

export function decryptr(entity: string) {
  const cryptr = new Cryptr(process.env.CRYPTR);
  const encryptedString = cryptr.decrypt(entity);
  return encryptedString;
}
