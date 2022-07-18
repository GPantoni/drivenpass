import { Router } from 'express';
import authRouter from './authRouter.js';
import cardRouter from './cardRouter.js';
import credentialRouter from './credentialRouter.js';

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(cardRouter);

export default router;
