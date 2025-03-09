import express from 'express';
import { trackerSdkController } from '../controllers/trackerSdkController';

export const trackerSdkRouter = express.Router();

trackerSdkRouter.post('/domains/:domain/userInfo', trackerSdkController.saveUserInfo);
trackerSdkRouter.post('/userDevice', trackerSdkController.saveUserDevice);
trackerSdkRouter.post('/userConnection', trackerSdkController.saveIsOnline);
trackerSdkRouter.post('/pageInfo/referrer', trackerSdkController.saveReferrer);
trackerSdkRouter.post('/pageInfo', trackerSdkController.savePageInfo);
trackerSdkRouter.post('/userAction/userScrollDepth', trackerSdkController.saveUserScrollDepth);
trackerSdkRouter.post('/userAction/bounceRate', trackerSdkController.saveBounceRate);
