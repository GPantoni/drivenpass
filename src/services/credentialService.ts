import * as errorUtils from '../utils/errorUtils.js';
import * as credentialRepository from '../repositories/credentialRepository.js';
import { InsertCredentialData } from '../repositories/credentialRepository.js';
import { encryptr, decryptr } from '../utils/cryptrUtils.js';

export async function createCredential(
  createCredentialData: InsertCredentialData
) {
  const isTitleUnavailable = await credentialRepository.getCredentialByTitle(
    createCredentialData.title,
    createCredentialData.userId
  );
  if (isTitleUnavailable) {
    throw errorUtils.errorForbidden('Title already in use');
  }

  const encryptedContent = encryptr(createCredentialData.password);

  createCredentialData = {
    ...createCredentialData,
    password: encryptedContent,
  };

  await credentialRepository.createCredential(createCredentialData);
}

export async function getCredential(id: number, userId: number) {
  let credential = await credentialRepository.getCredentialById(id, userId);
  if (!credential) {
    throw errorUtils.errorBadRequest(
      'This credential does not exists or belongs to another user'
    );
  }

  credential = { ...credential, password: decryptr(credential.password) };

  return credential;
}

export async function getAllCredentials(userId: number) {
  let credentials = await credentialRepository.getAllCredentials(userId);
  if (!credentials) {
    throw errorUtils.errorBadRequest('There are no credentials yet');
  }

  credentials = credentials.map((credential) => {
    return (credential = {
      ...credential,
      password: decryptr(credential.password),
    });
  });

  return credentials;
}

export async function deleteCredential(id: number, userId: number) {
  let credential = await credentialRepository.getCredentialById(id, userId);
  if (!credential) {
    throw errorUtils.errorBadRequest(
      'This credential does not exists or belongs to another user'
    );
  }

  await credentialRepository.deleteCredential(id, userId);
}
