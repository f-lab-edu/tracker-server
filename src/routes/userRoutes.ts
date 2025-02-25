import express from 'express';
import { userInfoController } from '../controllers/userController';

export const userInfoRouter = express.Router();

userInfoRouter.post('/userInfo', userInfoController.createUserInfo);
userInfoRouter.get('/userInfo', userInfoController.getUserInfo);
