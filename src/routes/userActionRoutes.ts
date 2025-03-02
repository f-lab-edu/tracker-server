import express from 'express';
import { userActionController } from '../controllers/userActionController';

export const userActionRouter = express.Router();

userActionRouter.post(
  '/domains/:domain/userAction/saveUserScrollDepth',
  userActionController.saveUserScrollDepth
);
userActionRouter.post(
  '/domains/:domain/userAction/saveBounceRate',
  userActionController.saveBounceRate
);
userActionRouter.get(
  '/domains/:domain/userAction/getPerPageAverageScrollDepth',
  userActionController.getPerPageAverageScrollDepth
);
userActionRouter.get(
  '/domains/:domain/userAction/getBounceRate',
  userActionController.getBounceRate
);
