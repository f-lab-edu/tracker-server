import { Request, Response } from 'express';
import { dashboardService } from '../services/dashboardService';
import { wrapAsync } from '../utils/wrapAsync';

export const dashboardController = {
  getOnlineUsersCount: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const onlineUsersCount = await dashboardService.getOnlineUsersCount(domain);
    res.status(200).json({ onlineUsersCount });
  }),

  getPerPageAverageScrollDepth: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const perPageAverageScrollDepth = await dashboardService.getPerPageAverageScrollDepth(domain);
    res.status(200).json(perPageAverageScrollDepth);
  }),

  getBounceRate: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const bounceRate = await dashboardService.getBounceRate(domain);
    res.status(200).json(bounceRate);
  }),

  getBrowserStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userBrowserStats = await dashboardService.getBrowserStats(domain);
    res.status(200).json(userBrowserStats);
  }),

  getOsStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userOsStats = await dashboardService.getOsStats(domain);
    res.status(200).json(userOsStats);
  }),

  getDeviceStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userDeviceStats = await dashboardService.getDeviceStats(domain);
    res.status(200).json(userDeviceStats);
  }),

  getResolutionStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userResolutionStats = await dashboardService.getResolutionStats(domain);
    res.status(200).json(userResolutionStats);
  }),

  getLanguageStats: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const languageStats = await dashboardService.getLanguageStats(domain);
    res.status(200).json(languageStats);
  }),

  getCountryStats: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const countryStats = await dashboardService.getCountryStats(domain);
    res.status(200).json(countryStats);
  }),

  getVisitedUsersRate: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const getVisitedUsersRate = await dashboardService.getVisitedUsersRate(domain);
    res.status(200).json(getVisitedUsersRate);
  }),

  getReferrerStats: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const referrerStatus = await dashboardService.getReferrerStats(domain);
    res.status(200).json(referrerStatus);
  }),

  getAveragePageLoadTime: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const avgLoadTime = await dashboardService.getAveragePageLoadTime(domain);
    res.status(200).json(avgLoadTime);
  }),

  getPageViewCount: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const { startDate, endDate } = req.query;
    if (typeof startDate !== 'string' || typeof endDate !== 'string') {
      res.status(400).json({ message: '시작 날짜와 종료날짜 올바르게 입력하세요' });
      return;
    }
    const pageViewCounts = await dashboardService.getPerPageViewCounts(domain, startDate, endDate);
    res.status(200).json(pageViewCounts);
  }),

  getVisitorsByPeriod: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const { startDate, endDate } = req.query;
    if (typeof startDate !== 'string' || typeof endDate !== 'string') {
      res.status(400).json({ message: 'startDate와 endDate는 필수입니다.' });
      return;
    }
    const visitorsData = await dashboardService.getPerVisitorCounts(domain, startDate, endDate);
    res.status(200).json(visitorsData);
  }),

  getTotalVisitors: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const totalVisitorsData = await dashboardService.getTotalVisitors(domain);
    res.status(200).json(totalVisitorsData);
  }),
};
