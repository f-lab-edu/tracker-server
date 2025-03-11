import express from 'express';
import { dashboardController } from '../controllers/dashboardController';

export const dashboardRouter = express.Router();

dashboardRouter.get('/dashboard/onlineUsersCount', dashboardController.getOnlineUsersCount);
dashboardRouter.get('/dashboard/browsersStats', dashboardController.getBrowserStats);
dashboardRouter.get('/dashboard/osStats', dashboardController.getOsStats);
dashboardRouter.get('/dashboard/deviceStats', dashboardController.getDeviceStats);
dashboardRouter.get('/dashboard/resolutionStats', dashboardController.getResolutionStats);
dashboardRouter.get('/dashboard/languageStats', dashboardController.getLanguageStats);
dashboardRouter.get('/dashboard/countryStats', dashboardController.getCountryStats);
dashboardRouter.get('/dashboard/visitedRate', dashboardController.getVisitedUsersRate);
dashboardRouter.get('/dashboard/referrer', dashboardController.getReferrerStats);
dashboardRouter.get('/dashboard/loadTime', dashboardController.getAveragePageLoadTime);
dashboardRouter.get('/dashboard/visitorsPageByPeriodCount', dashboardController.getPageViewCount);
dashboardRouter.get(
  '/dashboard/perPageAverageScrollDepth',
  dashboardController.getPerPageAverageScrollDepth
);
dashboardRouter.get('/dashboard/bounceRate', dashboardController.getPerPageBounceRate);
dashboardRouter.get(`/dashboard/visitorsByPeriodCount`, dashboardController.getVisitorsByPeriod);
dashboardRouter.get(`/dashboard/totalVisitorsCount`, dashboardController.getTotalVisitors);
dashboardRouter.post('/dashboard/enrollClient', dashboardController.enrollClient);
dashboardRouter.post('/dashboard/loginClient', dashboardController.loginClient);
dashboardRouter.post('/dashboard/logoutClient', dashboardController.logoutClient);
