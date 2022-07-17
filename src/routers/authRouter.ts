import { Router } from 'express';
import validateSchema from '../middlewares/validateSchema.js';
import * as authController from '../controllers/authController.js';
import { signSchema } from '../schemas/authSchemas.js';

const authRouter = Router();

authRouter.post('/signup', validateSchema(signSchema), authController.signUp);

authRouter.post('/signin', validateSchema(signSchema), authController.signIn);

export default authRouter;
