import { NextFunction, Request, Response } from 'express';
import { UUIDV4 } from 'sequelize';
import { userActionService } from '../services/userActionService';
import { userConnectionService } from '../services/userConnectionService';
import { userDeviceService } from '../services/userDeviceService';
import { userInfoService } from '../services/userInfoService';
import { userPageInfoService } from '../services/userPageInfoService';

export const trackerSdkController = {
  saveIsOnline: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.domain;
      const userId = req.cookies.userId;
      const { isOnline } = req.body;
      const existingUser = await userConnectionService.findByUserId(domain, userId);
      if (!existingUser) {
        await userConnectionService.createIsOnline(domain, userId);
        res.status(201).json({ message: '초기 userConnection 기록 성공' });
      } else {
        await userConnectionService.updateIsOnline(domain, userId, isOnline);
        res.status(200).json({ message: 'userConnection 업데이트 성공' });
      }
    } catch (err) {
      next(err);
    }
  },

  saveUserScrollDepth: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.domain;
      const userId = req.cookies.userId;
      await userActionService.saveUserScrollDepth({ ...req.body, domain, userId });
      res.status(201).json({ message: '스크롤깊이 전송 성공' });
    } catch (err) {
      next(err);
    }
  },

  saveBounceRate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.domain;
      const userId = req.cookies.userId;
      const url = req.body.url;
      await userActionService.saveBounceRate(domain, userId, url);
      res.status(201).json({ message: '이탈여부 전송 성공' });
    } catch (err) {
      next(err);
    }
  },

  saveUserDevice: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.domain;
      const userId = req.cookies.userId;
      await userDeviceService.saveUserDevice({ ...req.body, domain, userId });
      res.status(201).json({ message: '유저 디바이스 정보 전송 성공' });
    } catch (err) {
      next(err);
    }
  },

  saveUserInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { domain } = req.params;
      const userId = req.cookies.userId;
      await userInfoService.saveUserInfo({ ...req.body, domain, userId });
      res.status(201).json({ message: '유저 정보 전송 성공' });
    } catch (err) {
      next(err);
    }
  },

  saveReferrer: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.domain;
      const userId = req.cookies.userId;
      await userPageInfoService.saveReferrer({ ...req.body, domain, userId });
      res.status(201).json({ message: '유입 경로 저장완료' });
    } catch (err) {
      next(err);
    }
  },

  savePageInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const domain = res.locals.domain;
      const userId = req.cookies.userId;
      await userPageInfoService.savePageInfo({ ...req.body, domain, userId });
      res.status(201).json({ message: '페이지 로드 시간 저장완료' });
    } catch (err) {
      next(err);
    }
  },

  userCookie: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let userId = req.cookies.userId;
      if (!userId) {
        userId = UUIDV4();
      }
      res.setHeader(
        'Set-Cookie',
        `userId=${userId}; Max-Age=999999999; Path=/; SameSite=None; Secure; HttpOnly`
      );
      res.send({ success: true });
    } catch (err) {
      next(err);
    }
  },
};
