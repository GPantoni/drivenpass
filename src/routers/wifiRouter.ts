import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as wifiController from '../controllers/wifiController.js';
import validateSchema from '../middlewares/validateSchema.js';
import { wifiSchema } from '../schemas/wifiSchemas.js';

const wifiRouter = Router();

wifiRouter.post(
  '/wifis/create',
  validateSchema(wifiSchema),
  validateTokenMiddleware,
  wifiController.createWifi
);

wifiRouter.get(
  '/wifis',
  validateSchema(wifiSchema),
  validateTokenMiddleware,
  wifiController.getAllWifis
);

wifiRouter.get(
  '/wifis/:wifiId',
  validateSchema(wifiSchema),
  validateTokenMiddleware,
  wifiController.getWifi
);

wifiRouter.delete(
  '/wifis/:wifiId',
  validateSchema(wifiSchema),
  validateTokenMiddleware,
  wifiController.deleteWifi
);

export default wifiRouter;
