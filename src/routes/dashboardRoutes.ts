import express from 'express';
import { dashboardController } from '../controllers/dashboardController';
import { authenticateJWT } from '../middleware/authenticateJwt';

export const dashboardRouter = express.Router();

dashboardRouter.get('/onlineUsersCount', authenticateJWT, dashboardController.getOnlineUsersCount);
dashboardRouter.get('/browsersStats', authenticateJWT, dashboardController.getBrowserStats);
dashboardRouter.get('/osStats', authenticateJWT, dashboardController.getOsStats);
dashboardRouter.get('/deviceStats', authenticateJWT, dashboardController.getDeviceStats);
dashboardRouter.get('/resolutionStats', authenticateJWT, dashboardController.getResolutionStats);
dashboardRouter.get('/languageStats', authenticateJWT, dashboardController.getLanguageStats);
dashboardRouter.get('/countryStats', authenticateJWT, dashboardController.getCountryStats);
dashboardRouter.get('/visitedRate', authenticateJWT, dashboardController.getVisitedUsersRate);
dashboardRouter.get('/referrer', authenticateJWT, dashboardController.getReferrerStats);
dashboardRouter.get(
  '/visitorsPageByPeriodCount',
  authenticateJWT,
  dashboardController.getPageViewCount
);
dashboardRouter.get('/perPageAverageScrollDepth', dashboardController.getPerPageAverageScrollDepth);
dashboardRouter.get('/bounceRate', authenticateJWT, dashboardController.getPerPageBounceRate);
dashboardRouter.get(
  '/visitorsByPeriodCount',
  authenticateJWT,
  dashboardController.getVisitorsByPeriod
);
dashboardRouter.get('/totalVisitorsCount', authenticateJWT, dashboardController.getTotalVisitors);
dashboardRouter.post('/enrollClient', dashboardController.enrollClient);
dashboardRouter.post('/loginClient', dashboardController.loginClient);
