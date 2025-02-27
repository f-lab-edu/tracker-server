import express from 'express';
import { userPageInfoController } from '../controllers/userPageInfoController';

export const userPageInfoRouter = express.Router();

userPageInfoRouter.post('/pageInfo/referrer', userPageInfoController.saveReferrer);
userPageInfoRouter.get('/pageInfo/referrer/:domain', userPageInfoController.getReferrerStats);
userPageInfoRouter.post('/pageInfo/loadTime', userPageInfoController.savePageLoadTime);
userPageInfoRouter.get('/pageInfo/loadTime/:domain', userPageInfoController.getAveragePageLoadTime);
userPageInfoRouter.post('/pageInfo/visit', userPageInfoController.savePageViewCount);
userPageInfoRouter.get('/pageInfo/visit/:domain', userPageInfoController.getPageViewCount);
