import express from 'express';
import { dashboardController } from '../controllers/dashboardController';
import { ensureLogin } from '../middleware/ensureLogin';
export const dashboardRouter = express.Router();

dashboardRouter.get(
  '/dashboard/onlineUsersCount',
  ensureLogin,
  dashboardController.getOnlineUsersCount
);
dashboardRouter.get('/dashboard/browsersStats', ensureLogin, dashboardController.getBrowserStats);
dashboardRouter.get('/dashboard/osStats', ensureLogin, dashboardController.getOsStats);
dashboardRouter.get('/dashboard/deviceStats', ensureLogin, dashboardController.getDeviceStats);
dashboardRouter.get(
  '/dashboard/resolutionStats',
  ensureLogin,
  dashboardController.getResolutionStats
);
dashboardRouter.get('/dashboard/languageStats', ensureLogin, dashboardController.getLanguageStats);
dashboardRouter.get('/dashboard/countryStats', ensureLogin, dashboardController.getCountryStats);
dashboardRouter.get('/dashboard/visitedRate', ensureLogin, dashboardController.getVisitedUsersRate);
dashboardRouter.get('/dashboard/referrer', ensureLogin, dashboardController.getReferrerStats);
dashboardRouter.get('/dashboard/loadTime', ensureLogin, dashboardController.getAveragePageLoadTime);
dashboardRouter.get(
  '/dashboard/visitorsPageByPeriodCount',
  ensureLogin,
  dashboardController.getPageViewCount
);
dashboardRouter.get(
  '/dashboard/perPageAverageScrollDepth',
  dashboardController.getPerPageAverageScrollDepth
);
dashboardRouter.get('/dashboard/bounceRate', ensureLogin, dashboardController.getPerPageBounceRate);
dashboardRouter.get(
  '/dashboard/visitorsByPeriodCount',
  ensureLogin,
  dashboardController.getVisitorsByPeriod
);
dashboardRouter.get(
  '/dashboard/totalVisitorsCount',
  ensureLogin,
  dashboardController.getTotalVisitors
);
dashboardRouter.post('/dashboard/enrollClient', dashboardController.enrollClient);
dashboardRouter.post('/dashboard/loginClient', dashboardController.loginClient);
dashboardRouter.post('/dashboard/logoutClient', dashboardController.logoutClient);
