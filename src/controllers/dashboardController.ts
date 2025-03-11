import { NextFunction, Request, Response } from 'express';
import { dashboardClientService } from '../services/dashboardClientService';
import { userActionService } from '../services/userActionService';
import { userConnectionService } from '../services/userConnectionService';
import { userDeviceService } from '../services/userDeviceService';
import { userInfoService } from '../services/userInfoService';
import { userPageInfoService } from '../services/userPageInfoService';

export const dashboardController = {
  getOnlineUsersCount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const onlineUsersCount = await userConnectionService.getOnlineUsersCount(domain);
      res.status(200).json({ onlineUsersCount });
    } catch (err) {
      next(err);
    }
  },

  getPerPageAverageScrollDepth: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const perPageAverageScrollDepth =
        await userActionService.getPerPageAverageScrollDepth(domain);
      res.status(200).json(perPageAverageScrollDepth);
    } catch (err) {
      next(err);
    }
  },

  getPerPageBounceRate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const bounceRate = await userActionService.getPerPageBounceRate(domain);
      res.status(200).json(bounceRate);
    } catch (err) {
      next(err);
    }
  },

  getBrowserStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const userBrowserStats = await userDeviceService.getBrowserStats(domain);
      res.status(200).json(userBrowserStats);
    } catch (err) {
      next(err);
    }
  },

  getOsStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const userOsStats = await userDeviceService.getOsStats(domain);
      res.status(200).json(userOsStats);
    } catch (err) {
      next(err);
    }
  },

  getDeviceStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const userDeviceStats = await userDeviceService.getDeviceStats(domain);
      res.status(200).json(userDeviceStats);
    } catch (err) {
      next(err);
    }
  },

  getResolutionStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const userResolutionStats = await userDeviceService.getResolutionStats(domain);
      res.status(200).json(userResolutionStats);
    } catch (err) {
      next(err);
    }
  },

  getLanguageStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const languageStats = await userInfoService.getLanguageStats(domain);
      res.status(200).json(languageStats);
    } catch (err) {
      next(err);
    }
  },

  getCountryStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const countryStats = await userInfoService.getCountryStats(domain);
      res.status(200).json(countryStats);
    } catch (err) {
      next(err);
    }
  },

  getVisitedUsersRate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const getVisitedUsersRate = await userInfoService.getVisitedUsersRate(domain);
      res.status(200).json(getVisitedUsersRate);
    } catch (err) {
      next(err);
    }
  },

  getReferrerStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const referrerStatus = await userPageInfoService.getReferrerStats(domain);
      res.status(200).json(referrerStatus);
    } catch (err) {
      next(err);
    }
  },

  getAveragePageLoadTime: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const avgLoadTime = await userPageInfoService.getAveragePageLoadTime(domain);
      res.status(200).json(avgLoadTime);
    } catch (err) {
      next(err);
    }
  },

  getPageViewCount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.dashboardDomain;
      const { startDate, endDate } = req.query;
      if (typeof startDate !== 'string' || typeof endDate !== 'string') {
        res.status(400).json({ message: '시작 날짜와 종료날짜 올바르게 입력하세요' });
        return;
      }
      const pageViewCounts = await userPageInfoService.getPerDayPageViewCounts(
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
      const domain = res.locals.dashboardDomain;
      const { startDate, endDate } = req.query;
      if (typeof startDate !== 'string' || typeof endDate !== 'string') {
        res.status(400).json({ message: 'startDate와 endDate는 필수입니다.' });
        return;
      }
      const visitorsData = await userPageInfoService.getPerDayVisitorCounts(
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
      const domain = res.locals.dashboardDomain;
      const totalVisitorsData = await userPageInfoService.getTotalVisitors(domain);
      res.status(200).json(totalVisitorsData);
    } catch (err) {
      next(err);
    }
  },

  enrollClient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, domain } = req.body;
      const apiKey = await dashboardClientService.enrollClient(email, password, domain);
      res.status(201).json({ message: '회원가입 성공', apiKey });
    } catch (err) {
      next(err);
    }
  },

  loginClient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const domain = await dashboardClientService.loginClient(email, password);
      req.session.client = { email, domain };
      res.status(200).json({ message: '로그인 성공' });
    } catch (err) {
      next(err);
    }
  },

  logoutClient: (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.client) {
      next(new Error('이미 로그아웃'));
      return;
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: '로그아웃 성공' });
    });
  },
};
