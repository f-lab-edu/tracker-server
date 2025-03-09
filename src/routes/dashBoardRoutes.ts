import express from 'express';
import { dashboardController } from '../controllers/dashboardController';

export const dashboardRouter = express.Router();

dashboardRouter.get('/userConnection/onlineUsersCount', dashboardController.getOnlineUsersCount);
dashboardRouter.get('/userDevice/browsersStats', dashboardController.getBrowserStats);
dashboardRouter.get('/userDevice/osStats', dashboardController.getOsStats);
dashboardRouter.get('/userDevice/deviceStats', dashboardController.getDeviceStats);
dashboardRouter.get('/userDevice/resolutionStats', dashboardController.getResolutionStats);
dashboardRouter.get(
  '/domains/:domain/userInfo/languageStats',
  dashboardController.getLanguageStats
);
dashboardRouter.get('/domains/:domain/userInfo/countryStats', dashboardController.getCountryStats);
dashboardRouter.get(
  '/domains/:domain/userInfo/visitedRate',
  dashboardController.getVisitedUsersRate
);
dashboardRouter.get('/domains/:domain/pageInfo/referrer', dashboardController.getReferrerStats);
dashboardRouter.get(
  '/domains/:domain/pageInfo/loadTime',
  dashboardController.getAveragePageLoadTime
);
dashboardRouter.get(
  '/domains/:domain/pageInfo/visitorsPageByPeriodCount',
  dashboardController.getPageViewCount
);
dashboardRouter.get(
  '/userAction/perPageAverageScrollDepth',
  dashboardController.getPerPageAverageScrollDepth
);
dashboardRouter.get('/userAction/bounceRate', dashboardController.getPerPageBounceRate);
dashboardRouter.get(
  `/domains/:domain/pageInfo/visitorsByPeriodCount`,
  dashboardController.getVisitorsByPeriod
);
dashboardRouter.get(
  `/domains/:domain/pageInfo/totalVisitorsCount`,
  dashboardController.getTotalVisitors
);
