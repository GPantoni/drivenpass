import { User } from '@prisma/client';
import * as errorUtils from '../utils/errorUtils.js';
import * as authRepository from '../repositories/authRepository.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export type SignUserData = Omit<User, 'id'>;

export async function signUp(createUserData: SignUserData) {
  const { email, password } = createUserData;

  const isEmailUnavailable = await authRepository.findUserByEmail(email);
  if (isEmailUnavailable) {
    throw errorUtils.errorForbidden('Email already in use');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  createUserData = { ...createUserData, password: hashedPassword };

  await authRepository.createUser(createUserData);
}

export async function signIn(userData: SignUserData) {
  const { email, password } = userData;

  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw errorUtils.errorNotFound('email');
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    throw errorUtils.errorUnauthorized('Password');
  }

  const token = Jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  await authRepository.createSession({ userId: user.id, token });

  return token;
}
