import { Router } from 'express';
import * as userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/signup');

userRouter.post('/signin');

export default userRouter;
