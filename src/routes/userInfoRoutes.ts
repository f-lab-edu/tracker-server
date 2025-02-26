import express from 'express';
import { userInfoController } from '../controllers/userInfoController';

export const userInfoRouter = express.Router();

userInfoRouter.post('/userInfo', userInfoController.createUserInfo);
userInfoRouter.get('/userInfo', userInfoController.getUserInfo);
