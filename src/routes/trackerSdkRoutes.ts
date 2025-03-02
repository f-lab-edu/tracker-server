import express from 'express';
import { heartbeatController } from '../controllers/heartbeatController';
import { userActionController } from '../controllers/userActionController';
import { userDeviceController } from '../controllers/userDeviceController';
import { userInfoController } from '../controllers/userInfoController';
import { userPageInfoController } from '../controllers/userPageInfoController';

export const trackerSdkRouter = express.Router();

trackerSdkRouter.post('/domains/:domain/userInfo', userInfoController.saveUserInfo);
trackerSdkRouter.post('/domains/:domain/userDevice', userDeviceController.saveUserDevice);
trackerSdkRouter.post('/domains/:domain/heartbeat', heartbeatController.saveHeartbeat);
trackerSdkRouter.post('/domains/:domain/pageInfo/referrer', userPageInfoController.saveReferrer);
trackerSdkRouter.post(
  '/domains/:domain/pageInfo/loadTime',
  userPageInfoController.savePageLoadTime
);
trackerSdkRouter.post('/domains/:domain/pageInfo/visit', userPageInfoController.savePageViewCount);
trackerSdkRouter.post(
  '/domains/:domain/userAction/saveUserScrollDepth',
  userActionController.saveUserScrollDepth
);
trackerSdkRouter.post(
  '/domains/:domain/userAction/saveBounceRate',
  userActionController.saveBounceRate
);
