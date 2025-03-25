import { NextFunction, Request, Response } from 'express';
import { dashboardClientService } from '../services/dashboardClientService';
import { userActionService } from '../services/userActionService';
import { userConnectionService } from '../services/userConnectionService';
import { userDeviceService } from '../services/userDeviceService';
import { userInfoService } from '../services/userInfoService';
import { userPageInfoService } from '../services/userPageInfoService';
import { AuthenticatedRequest } from '../types/sessionType';

export const dashboardController = {
  getOnlineUsersCount: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
      const onlineUsersCount = await userConnectionService.getOnlineUsersCount(domain);
      res.status(200).json({ onlineUsersCount });
    } catch (err) {
      next(err);
    }
  },

  getPerPageAverageScrollDepth: async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const domain = req.session.client.domain;
      const perPageAverageScrollDepth =
        await userActionService.getPerPageAverageScrollDepth(domain);
      res.status(200).json(perPageAverageScrollDepth);
    } catch (err) {
      next(err);
    }
  },

  getPerPageBounceRate: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
      const bounceRate = await userActionService.getPerPageBounceRate(domain);
      res.status(200).json(bounceRate);
    } catch (err) {
      next(err);
    }
  },

  getBrowserStats: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
      const userBrowserStats = await userDeviceService.getBrowserStats(domain);
      res.status(200).json(userBrowserStats);
    } catch (err) {
      next(err);
    }
  },

  getOsStats: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
      const userOsStats = await userDeviceService.getOsStats(domain);
      res.status(200).json(userOsStats);
    } catch (err) {
      next(err);
    }
  },

  getDeviceStats: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
      const userDeviceStats = await userDeviceService.getDeviceStats(domain);
      res.status(200).json(userDeviceStats);
    } catch (err) {
      next(err);
    }
  },

  getResolutionStats: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
      const userResolutionStats = await userDeviceService.getResolutionStats(domain);
      res.status(200).json(userResolutionStats);
    } catch (err) {
      next(err);
    }
  },

  getLanguageStats: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
      const languageStats = await userInfoService.getLanguageStats(domain);
      res.status(200).json(languageStats);
    } catch (err) {
      next(err);
    }
  },

  getCountryStats: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
      const countryStats = await userInfoService.getCountryStats(domain);
      res.status(200).json(countryStats);
    } catch (err) {
      next(err);
    }
  },

  getVisitedUsersRate: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
      const getVisitedUsersRate = await userInfoService.getVisitedUsersRate(domain);
      res.status(200).json(getVisitedUsersRate);
    } catch (err) {
      next(err);
    }
  },

  getReferrerStats: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
      const referrerStatus = await userPageInfoService.getReferrerStats(domain);
      res.status(200).json(referrerStatus);
    } catch (err) {
      next(err);
    }
  },

  getPageViewCount: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
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

  getVisitorsByPeriod: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
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

  getTotalVisitors: async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const domain = req.session.client.domain;
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
      const clientInfo = await dashboardClientService.loginClient(email, password);
      req.session.client = { email, domain: clientInfo.domain, apiKey: clientInfo.apiKey };
      req.session.save((err) => {
        if (err) {
          console.error('세션 저장 실패:', err);
          return res.status(500).json({ message: '세션 저장 실패' });
        }
        res.status(200).json({ message: '로그인 성공' });
      });
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

  sessionClient: (req: Request, res: Response) => {
    if (req.session.client) {
      res.json({ user: req.session.client });
    } else {
      res.status(401).json({ message: '세션없음' });
    }
  },
};
