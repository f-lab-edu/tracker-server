import express from 'express';
import { userInfoController } from '../controllers/userController';

export const router = express.Router();

router.post('/userInfo', userInfoController.createUserInfo);
router.get('/userInfo');
