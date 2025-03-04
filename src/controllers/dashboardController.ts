import { Request, Response } from 'express';
import { heartbeatService } from '../services/heartbeatService';
import { userActionService } from '../services/userActionService';
import { userDeviceService } from '../services/userDeviceService';
import { userInfoService } from '../services/userInfoService';
import { userPageInfoService } from '../services/userPageInfoService';
import { wrapAsync } from '../utils/wrapAsync';

export const dashboardController = {
  getOnlineUsersCount: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const onlineUsersCount = await heartbeatService.getOnlineUsersCount(domain);
    res.status(200).json({ onlineUsersCount });
  }),

  getPerPageAverageScrollDepth: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const perPageAverageScrollDepth = await userActionService.getPerPageAverageScrollDepth(domain);
    res.status(200).json(perPageAverageScrollDepth);
  }),

  getBounceRate: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const bounceRate = await userActionService.getBounceRate(domain);
    res.status(200).json(bounceRate);
  }),

  getBrowserStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userBrowserStats = await userDeviceService.getBrowserStats(domain);
    res.status(200).json(userBrowserStats);
  }),

  getOsStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userOsStats = await userDeviceService.getOsStats(domain);
    res.status(200).json(userOsStats);
  }),

  getDeviceStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userDeviceStats = await userDeviceService.getDeviceStats(domain);
    res.status(200).json(userDeviceStats);
  }),

  getResolutionStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userResolutionStats = await userDeviceService.getResolutionStats(domain);
    res.status(200).json(userResolutionStats);
  }),

  getLanguageStats: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const languageStats = await userInfoService.getLanguageStats(domain);
    res.status(200).json(languageStats);
  }),

  getCountryStats: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const countryStats = await userInfoService.getCountryStats(domain);
    res.status(200).json(countryStats);
  }),

  getVisitedUsersRate: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const getVisitedUsersRate = await userInfoService.getVisitedUsersRate(domain);
    res.status(200).json(getVisitedUsersRate);
  }),

  getReferrerStats: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const referrerStatus = await userPageInfoService.getReferrerStats(domain);
    res.status(200).json(referrerStatus);
  }),

  getAveragePageLoadTime: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const avgLoadTime = await userPageInfoService.getAveragePageLoadTime(domain);
    res.status(200).json(avgLoadTime);
  }),

  getPageViewCount: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const { startDate, endDate } = req.query;
    if (typeof startDate !== 'string' || typeof endDate !== 'string') {
      res.status(400).json({ message: '시작 날짜와 종료날짜 올바르게 입력하세요' });
      return;
    }
    const pageViewCounts = await userPageInfoService.getPerPageViewCounts(
      domain,
      startDate,
      endDate
    );
    res.status(200).json(pageViewCounts);
  }),

  getVisitorsByPeriod: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const { startDate, endDate } = req.query;
    if (typeof startDate !== 'string' || typeof endDate !== 'string') {
      res.status(400).json({ message: 'startDate와 endDate는 필수입니다.' });
      return;
    }
    const visitorsData = await userPageInfoService.getPerVisitorCounts(domain, startDate, endDate);
    res.status(200).json(visitorsData);
  }),

  getTotalVisitors: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const totalVisitorsData = await userPageInfoService.getTotalVisitors(domain);
    res.status(200).json(totalVisitorsData);
  }),
};
