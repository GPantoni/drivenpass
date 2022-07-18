import Joi from 'joi';
import { InsertWifiData } from '../repositories/wifiRepository.js';

export const wifiSchema = Joi.object<InsertWifiData>({
  title: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});
