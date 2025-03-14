import express from 'express';
import { trackerSdkController } from '../controllers/trackerSdkController';
import { authenticateAPIKey } from '../middleware/authenticateAPIKey';
import { trackerUserSetCookieId } from '../middleware/setCookieUser';
export const trackerSdkRouter = express.Router();

trackerSdkRouter.post(
  'trackerSdk/userInfo',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveUserInfo
);
trackerSdkRouter.post(
  'trackerSdk/userDevice',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveUserDevice
);
trackerSdkRouter.post(
  'trackerSdk/userConnection',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveIsOnline
);
trackerSdkRouter.post(
  'trackerSdk/pageInfo/referrer',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveReferrer
);
trackerSdkRouter.post(
  'trackerSdk/pageInfo',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.savePageInfo
);
trackerSdkRouter.post(
  'trackerSdk/userAction/userScrollDepth',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveUserScrollDepth
);
trackerSdkRouter.post(
  'trackerSdk/userAction/bounceRate',
  trackerUserSetCookieId,
  authenticateAPIKey,
  trackerSdkController.saveBounceRate
);
