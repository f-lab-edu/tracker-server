import express from 'express';
import { heartbeatController } from '../controllers/heartbeatController';
import { userDeviceController } from '../controllers/userDeviceController';
import { userInfoController } from '../controllers/userInfoController';
import { userPageInfoController } from '../controllers/userPageInfoController';

export const dashBoardRouter = express.Router();

dashBoardRouter.get('/domains/:domain/onlineUsersCount', heartbeatController.getOnlineUsersCount);
dashBoardRouter.get(
  '/domains/:domain/userDevice/browsersStats',
  userDeviceController.getBrowserStats
);
dashBoardRouter.get('/domains/:domain/userDevice/osStats', userDeviceController.getOsStats);
dashBoardRouter.get('/domains/:domain/userDevice/deviceStats', userDeviceController.getDeviceStats);
dashBoardRouter.get(
  '/domains/:domain/userDevice/resolutionStats',
  userDeviceController.getResolutionStats
);
dashBoardRouter.get('/domains/:domain/userInfo/languageStats', userInfoController.getLanguageStats);
dashBoardRouter.get('/domains/:domain/userInfo/countryStats', userInfoController.getCountryStats);
dashBoardRouter.get(
  '/domains/:domain/userInfo/visited-rate',
  userInfoController.getVisitedUsersRate
);
dashBoardRouter.get('/domains/:domain/pageInfo/referrer', userPageInfoController.getReferrerStats);
dashBoardRouter.get(
  '/domains/:domain/pageInfo/loadTime',
  userPageInfoController.getAveragePageLoadTime
);
dashBoardRouter.get('/domains/:domain/pageInfo/visit', userPageInfoController.getPageViewCount);
