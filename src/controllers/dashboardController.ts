import { NextFunction, Request, Response } from 'express';
import { heartbeatService } from '../services/heartbeatService';
import { userActionService } from '../services/userActionService';
import { userDeviceService } from '../services/userDeviceService';
import { userInfoService } from '../services/userInfoService';
import { userPageInfoService } from '../services/userPageInfoService';

export const dashboardController = {
  getOnlineUsersCount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { domain } = req.params;
      const onlineUsersCount = await heartbeatService.getOnlineUsersCount(domain);
      res.status(200).json({ onlineUsersCount });
    } catch (err) {
      next(err);
    }
  },

  getPerPageAverageScrollDepth: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { domain } = req.params;
      const perPageAverageScrollDepth =
        await userActionService.getPerPageAverageScrollDepth(domain);
      res.status(200).json(perPageAverageScrollDepth);
    } catch (err) {
      next(err);
    }
  },

  getBounceRate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { domain } = req.params;
      const bounceRate = await userActionService.getBounceRate(domain);
      res.status(200).json(bounceRate);
    } catch (err) {
      next(err);
    }
  },

  getBrowserStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { domain } = req.params;
      const userBrowserStats = await userDeviceService.getBrowserStats(domain);
      res.status(200).json(userBrowserStats);
    } catch (err) {
      next(err);
    }
  },

  getOsStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { domain } = req.params;
      const userOsStats = await userDeviceService.getOsStats(domain);
      res.status(200).json(userOsStats);
    } catch (err) {
      next(err);
    }
  },

  getDeviceStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { domain } = req.params;
      const userDeviceStats = await userDeviceService.getDeviceStats(domain);
      res.status(200).json(userDeviceStats);
    } catch (err) {
      next(err);
    }
  },

  getResolutionStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { domain } = req.params;
      const userResolutionStats = await userDeviceService.getResolutionStats(domain);
      res.status(200).json(userResolutionStats);
    } catch (err) {
      next(err);
    }
  },

  getLanguageStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = req.params.domain;
      const languageStats = await userInfoService.getLanguageStats(domain);
      res.status(200).json(languageStats);
    } catch (err) {
      next(err);
    }
  },

  getCountryStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = req.params.domain;
      const countryStats = await userInfoService.getCountryStats(domain);
      res.status(200).json(countryStats);
    } catch (err) {
      next(err);
    }
  },

  getVisitedUsersRate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = req.params.domain;
      const getVisitedUsersRate = await userInfoService.getVisitedUsersRate(domain);
      res.status(200).json(getVisitedUsersRate);
    } catch (err) {
      next(err);
    }
  },

  getReferrerStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = req.params.domain;
      const referrerStatus = await userPageInfoService.getReferrerStats(domain);
      res.status(200).json(referrerStatus);
    } catch (err) {
      next(err);
    }
  },

  getAveragePageLoadTime: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = req.params.domain;
      const avgLoadTime = await userPageInfoService.getAveragePageLoadTime(domain);
      res.status(200).json(avgLoadTime);
    } catch (err) {
      next(err);
    }
  },

  getPageViewCount: async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (err) {
      next(err);
    }
  },

  getVisitorsByPeriod: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { domain } = req.params;
      const { startDate, endDate } = req.query;
      if (typeof startDate !== 'string' || typeof endDate !== 'string') {
        res.status(400).json({ message: 'startDate와 endDate는 필수입니다.' });
        return;
      }
      const visitorsData = await userPageInfoService.getPerVisitorCounts(
        domain,
        startDate,
        endDate
      );
      res.status(200).json(visitorsData);
    } catch (err) {
      next(err);
    }
  },

  getTotalVisitors: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { domain } = req.params;
      const totalVisitorsData = await userPageInfoService.getTotalVisitors(domain);
      res.status(200).json(totalVisitorsData);
    } catch (err) {
      next(err);
    }
  },
};
