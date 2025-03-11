import express from 'express';
import { dashboardController } from '../controllers/dashboardController';
import { hasDashboardDomain } from '../middleware/hasDashboardDomain';
export const dashboardRouter = express.Router();

dashboardRouter.get(
  '/dashboard/onlineUsersCount',
  hasDashboardDomain,
  dashboardController.getOnlineUsersCount
);
dashboardRouter.get(
  '/dashboard/browsersStats',
  hasDashboardDomain,
  dashboardController.getBrowserStats
);
dashboardRouter.get('/dashboard/osStats', hasDashboardDomain, dashboardController.getOsStats);
dashboardRouter.get(
  '/dashboard/deviceStats',
  hasDashboardDomain,
  dashboardController.getDeviceStats
);
dashboardRouter.get(
  '/dashboard/resolutionStats',
  hasDashboardDomain,
  dashboardController.getResolutionStats
);
dashboardRouter.get(
  '/dashboard/languageStats',
  hasDashboardDomain,
  dashboardController.getLanguageStats
);
dashboardRouter.get(
  '/dashboard/countryStats',
  hasDashboardDomain,
  dashboardController.getCountryStats
);
dashboardRouter.get(
  '/dashboard/visitedRate',
  hasDashboardDomain,
  dashboardController.getVisitedUsersRate
);
dashboardRouter.get(
  '/dashboard/referrer',
  hasDashboardDomain,
  dashboardController.getReferrerStats
);
dashboardRouter.get(
  '/dashboard/loadTime',
  hasDashboardDomain,
  dashboardController.getAveragePageLoadTime
);
dashboardRouter.get(
  '/dashboard/visitorsPageByPeriodCount',
  hasDashboardDomain,
  dashboardController.getPageViewCount
);
dashboardRouter.get(
  '/dashboard/perPageAverageScrollDepth',
  dashboardController.getPerPageAverageScrollDepth
);
dashboardRouter.get(
  '/dashboard/bounceRate',
  hasDashboardDomain,
  dashboardController.getPerPageBounceRate
);
dashboardRouter.get(
  '/dashboard/visitorsByPeriodCount',
  hasDashboardDomain,
  dashboardController.getVisitorsByPeriod
);
dashboardRouter.get(
  '/dashboard/totalVisitorsCount',
  hasDashboardDomain,
  dashboardController.getTotalVisitors
);
dashboardRouter.post('/dashboard/enrollClient', dashboardController.enrollClient);
dashboardRouter.post('/dashboard/loginClient', dashboardController.loginClient);
dashboardRouter.post('/dashboard/logoutClient', dashboardController.logoutClient);
