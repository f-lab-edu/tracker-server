import express from 'express';
import { userInfoController } from '../controllers/userInfoController';

export const userInfoRouter = express.Router();

userInfoRouter.post('/userInfo', userInfoController.saveUserInfo);
userInfoRouter.get(
  '/userInfo/languageStats/:domain',
  userInfoController.getLanguageStats
);
userInfoRouter.get(
  '/userInfo/countryStats/:domain',
  userInfoController.getCountryStats
);
userInfoRouter.get(
  '/userInfo/visited-rate/:domain',
  userInfoController.getVisitedUsersRate
);
