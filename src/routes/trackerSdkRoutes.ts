import express from 'express';
import { trackerSdkController } from '../controllers/trackerSdkController';

export const trackerSdkRouter = express.Router();

trackerSdkRouter.post('/domains/:domain/userInfo', trackerSdkController.saveUserInfo);
trackerSdkRouter.post('/domains/:domain/userDevice', trackerSdkController.saveUserDevice);
trackerSdkRouter.post('/domains/:domain/heartbeat', trackerSdkController.saveHeartbeat);
trackerSdkRouter.post('/domains/:domain/pageInfo/referrer', trackerSdkController.saveReferrer);
trackerSdkRouter.post('/domains/:domain/pageInfo/loadTime', trackerSdkController.savePageLoadTime);
trackerSdkRouter.post('/domains/:domain/pageInfo/visit', trackerSdkController.savePageViewCount);
trackerSdkRouter.post(
  '/domains/:domain/userAction/userScrollDepth',
  trackerSdkController.saveUserScrollDepth
);
trackerSdkRouter.post(
  '/domains/:domain/userAction/bounceRate',
  trackerSdkController.saveBounceRate
);
