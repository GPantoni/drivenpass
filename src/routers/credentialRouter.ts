import { Router } from 'express';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as credentialController from '../controllers/credentialController.js';
import validateSchema from '../middlewares/validateSchema.js';
import { credentialSchema } from '../schemas/credentialSchemas.js';

const credentialRouter = Router();

credentialRouter.post(
  '/credentials/create',
  validateSchema(credentialSchema),
  validateTokenMiddleware,
  credentialController.createCredential
);

credentialRouter.get(
  '/credentials',
  validateTokenMiddleware,
  credentialController.getAllCredentials
);

credentialRouter.get(
  '/credentials/:credentialId',
  validateTokenMiddleware,
  credentialController.getCredential
);

credentialRouter.delete(
  '/credentials/:credentialId',
  validateTokenMiddleware,
  credentialController.deleteCredential
);

export default credentialRouter;
