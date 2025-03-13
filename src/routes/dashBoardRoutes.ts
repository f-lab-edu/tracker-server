import express, { RequestHandler } from 'express';
import { dashboardController } from '../controllers/dashboardController';
import { ensureLogin } from '../middleware/ensureLogin';
export const dashboardRouter = express.Router();

dashboardRouter.get(
  '/dashboard/onlineUsersCount',
  ensureLogin,
  dashboardController.getOnlineUsersCount as RequestHandler
);
dashboardRouter.get(
  '/dashboard/browsersStats',
  ensureLogin,
  dashboardController.getBrowserStats as RequestHandler
);
dashboardRouter.get(
  '/dashboard/osStats',
  ensureLogin,
  dashboardController.getOsStats as RequestHandler
);
dashboardRouter.get(
  '/dashboard/deviceStats',
  ensureLogin,
  dashboardController.getDeviceStats as RequestHandler
);
dashboardRouter.get(
  '/dashboard/resolutionStats',
  ensureLogin,
  dashboardController.getResolutionStats as RequestHandler
);
dashboardRouter.get(
  '/dashboard/languageStats',
  ensureLogin,
  dashboardController.getLanguageStats as RequestHandler
);
dashboardRouter.get(
  '/dashboard/countryStats',
  ensureLogin,
  dashboardController.getCountryStats as RequestHandler
);
dashboardRouter.get(
  '/dashboard/visitedRate',
  ensureLogin,
  dashboardController.getVisitedUsersRate as RequestHandler
);
dashboardRouter.get(
  '/dashboard/referrer',
  ensureLogin,
  dashboardController.getReferrerStats as RequestHandler
);
dashboardRouter.get(
  '/dashboard/loadTime',
  ensureLogin,
  dashboardController.getAveragePageLoadTime as RequestHandler
);
dashboardRouter.get(
  '/dashboard/visitorsPageByPeriodCount',
  ensureLogin,
  dashboardController.getPageViewCount as RequestHandler
);
dashboardRouter.get(
  '/dashboard/perPageAverageScrollDepth',
  dashboardController.getPerPageAverageScrollDepth as RequestHandler
);
dashboardRouter.get(
  '/dashboard/bounceRate',
  ensureLogin,
  dashboardController.getPerPageBounceRate as RequestHandler
);
dashboardRouter.get(
  '/dashboard/visitorsByPeriodCount',
  ensureLogin,
  dashboardController.getVisitorsByPeriod as RequestHandler
);
dashboardRouter.get(
  '/dashboard/totalVisitorsCount',
  ensureLogin,
  dashboardController.getTotalVisitors as RequestHandler
);
dashboardRouter.post('/dashboard/enrollClient', dashboardController.enrollClient);
dashboardRouter.post('/dashboard/loginClient', dashboardController.loginClient);
dashboardRouter.post('/dashboard/logoutClient', dashboardController.logoutClient);
