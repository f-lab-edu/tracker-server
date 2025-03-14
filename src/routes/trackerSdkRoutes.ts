import express from 'express';
import { trackerSdkController } from '../controllers/trackerSdkController';
import { authenticateAPIKey } from '../middleware/authenticateAPIKey';
import { trackerUserSetCookieId } from '../middleware/setCookieUser';
export const trackerSdkRouter = express.Router();

trackerSdkRouter.post(
  '/userInfo',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveUserInfo
);
trackerSdkRouter.post(
  '/userDevice',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveUserDevice
);
trackerSdkRouter.post(
  '/userConnection',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveIsOnline
);
trackerSdkRouter.post(
  '/pageInfo/referrer',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveReferrer
);
trackerSdkRouter.post(
  '/pageInfo',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.savePageInfo
);
trackerSdkRouter.post(
  '/userAction/userScrollDepth',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveUserScrollDepth
);
trackerSdkRouter.post(
  '/userAction/bounceRate',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveBounceRate
);
