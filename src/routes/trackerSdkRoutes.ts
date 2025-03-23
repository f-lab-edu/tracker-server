import express from 'express';
import { trackerSdkController } from '../controllers/trackerSdkController';
import { authenticateAPIKey } from '../middleware/authenticateAPIKey';
export const trackerSdkRouter = express.Router();

trackerSdkRouter.post('/userInfo', authenticateAPIKey, trackerSdkController.saveUserInfo);
trackerSdkRouter.post('/userDevice', authenticateAPIKey, trackerSdkController.saveUserDevice);
trackerSdkRouter.post('/userConnection', authenticateAPIKey, trackerSdkController.saveIsOnline);
trackerSdkRouter.post('/pageInfo/referrer', authenticateAPIKey, trackerSdkController.saveReferrer);
trackerSdkRouter.post('/pageInfo', authenticateAPIKey, trackerSdkController.savePageInfo);
trackerSdkRouter.post(
  '/userAction/userScrollDepth',
  authenticateAPIKey,
  trackerSdkController.saveUserScrollDepth
);
trackerSdkRouter.post('/userAction/bounceRate/beacon', trackerSdkController.saveBounceRateBeacon);
trackerSdkRouter.post('/userConnection/beacon', trackerSdkController.saveOfflineBeacon);
