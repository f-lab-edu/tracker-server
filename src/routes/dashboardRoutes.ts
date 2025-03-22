import express, { RequestHandler } from 'express';
import { dashboardController } from '../controllers/dashboardController';
import { ensureLogin } from '../middleware/ensureLogin';

export const dashboardRouter = express.Router();

dashboardRouter.get(
  '/onlineUsersCount',
  ensureLogin,
  dashboardController.getOnlineUsersCount as RequestHandler
);
dashboardRouter.get(
  '/browsersStats',
  ensureLogin,
  dashboardController.getBrowserStats as RequestHandler
);
dashboardRouter.get('/osStats', ensureLogin, dashboardController.getOsStats as RequestHandler);
dashboardRouter.get(
  '/deviceStats',
  ensureLogin,
  dashboardController.getDeviceStats as RequestHandler
);
dashboardRouter.get(
  '/resolutionStats',
  ensureLogin,
  dashboardController.getResolutionStats as RequestHandler
);
dashboardRouter.get(
  '/languageStats',
  ensureLogin,
  dashboardController.getLanguageStats as RequestHandler
);
dashboardRouter.get(
  '/countryStats',
  ensureLogin,
  dashboardController.getCountryStats as RequestHandler
);
dashboardRouter.get(
  '/visitedRate',
  ensureLogin,
  dashboardController.getVisitedUsersRate as RequestHandler
);
dashboardRouter.get(
  '/referrer',
  ensureLogin,
  dashboardController.getReferrerStats as RequestHandler
);
dashboardRouter.get(
  '/loadTime',
  ensureLogin,
  dashboardController.getAveragePageLoadTime as RequestHandler
);
dashboardRouter.get(
  '/visitorsPageByPeriodCount',
  ensureLogin,
  dashboardController.getPageViewCount as RequestHandler
);
dashboardRouter.get(
  '/perPageAverageScrollDepth',
  dashboardController.getPerPageAverageScrollDepth as RequestHandler
);
dashboardRouter.get(
  '/bounceRate',
  ensureLogin,
  dashboardController.getPerPageBounceRate as RequestHandler
);
dashboardRouter.get(
  '/visitorsByPeriodCount',
  ensureLogin,
  dashboardController.getVisitorsByPeriod as RequestHandler
);
dashboardRouter.get(
  '/totalVisitorsCount',
  ensureLogin,
  dashboardController.getTotalVisitors as RequestHandler
);
dashboardRouter.post('/enrollClient', dashboardController.enrollClient);
dashboardRouter.post('/loginClient', dashboardController.loginClient);
dashboardRouter.post('/logoutClient', dashboardController.logoutClient);
dashboardRouter.get('/sessionClient', dashboardController.sessionClient);
