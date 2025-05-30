import { NextFunction, Request, Response } from 'express';
import { getClientDomain } from '../services/apiKeyService';
import { userActionService } from '../services/userActionService';
import { userConnectionService } from '../services/userConnectionService';
import { userDeviceService } from '../services/userDeviceService';
import { userInfoService } from '../services/userInfoService';
import { userPageInfoService } from '../services/userPageInfoService';

export const trackerSdkController = {
  saveIsOnline: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.domain;
      const userId = req.headers['x-user-id'] as string;
      const { isOnline } = req.body;
      const existingUser = await userConnectionService.findByUserId(domain, userId);
      if (!existingUser) {
        await userConnectionService.createIsOnline(domain, userId);
        res.status(201).json({ message: '초기 userConnection 기록 성공' });
      } else {
        await userConnectionService.updateHeartbeat(domain, userId, isOnline);
        res.status(200).json({ message: 'heartbeat online 업데이트 성공' });
      }
    } catch (err) {
      next(err);
    }
  },

  saveUserDevice: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.domain;
      const userId = req.headers['x-user-id'] as string;
      await userDeviceService.saveUserDevice({ ...req.body, domain, userId });
      res.status(201).json({ message: '유저 디바이스 정보 전송 성공' });
    } catch (err) {
      next(err);
    }
  },

  saveUserInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.domain;
      const userId = req.headers['x-user-id'] as string;
      await userInfoService.saveUserInfo({ ...req.body, domain, userId });
      res.status(201).json({ message: '유저 정보 전송 성공' });
    } catch (err) {
      next(err);
    }
  },

  saveReferrer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.domain;
      const userId = req.headers['x-user-id'] as string;
      await userPageInfoService.saveReferrer({ ...req.body, domain, userId });
      res.status(201).json({ message: '유입 경로 저장완료' });
    } catch (err) {
      next(err);
    }
  },

  savePageInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.domain;
      const userId = req.headers['x-user-id'] as string;
      await userPageInfoService.savePageInfo({ ...req.body, domain, userId });
      res.status(201).json({ message: '페이지 로드 시간 저장완료' });
    } catch (err) {
      next(err);
    }
  },

  saveOfflineBeacon: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { apiKey, userId, isOnline } = req.body;
      const { domain } = await getClientDomain(apiKey);
      await userConnectionService.updateIsOnline(domain, userId, isOnline);
      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  },

  saveBounceRateBeacon: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { apiKey, userId, url } = req.body;
      const { domain } = await getClientDomain(apiKey);
      await userActionService.saveBounceRate(domain, userId, url);
      res.status(201).json({ message: '이탈여부 전송 성공' });
    } catch (err) {
      next(err);
    }
  },

  saveUserScrollDepthBeacon: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { apiKey, url, scrollDepth, userId } = req.body;
      const { domain } = await getClientDomain(apiKey);
      await userActionService.saveUserScrollDepth({ domain, userId, scrollDepth, url });
      res.status(201).json({ message: '스크롤깊이 전송 성공' });
    } catch (err) {
      next(err);
    }
  },
};
