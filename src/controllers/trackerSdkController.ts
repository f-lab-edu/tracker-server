import { Request, Response } from 'express';
import { heartbeatService } from '../services/heartbeatService';
import { userActionService } from '../services/userActionService';
import { userDeviceService } from '../services/userDeviceService';
import { userInfoService } from '../services/userInfoService';
import { userPageInfoService } from '../services/userPageInfoService';
import { wrapAsync } from '../utils/wrapAsync';

export const trackerSdkController = {
  saveHeartbeat: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userId = req.cookies.userId;
    const { isOnline } = req.body;
    const existingUser = await heartbeatService.findByUserId(domain, userId);
    if (!existingUser) {
      await heartbeatService.createHeartbeat(domain, userId);
      res.status(201).json({ message: '초기 heartbeat 기록 성공' });
    } else {
      await heartbeatService.updateHeartbeat(domain, userId, isOnline);
      res.status(200).json({ message: 'heartbeat 업데이트 성공' });
    }
  }),

  saveUserScrollDepth: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userId = req.cookies.userId;
    await userActionService.saveUserScrollDepth({ ...req.body, domain, userId });
    res.status(201).json({ message: '스크롤깊이 전송 성공' });
  }),

  saveBounceRate: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userId = req.cookies.userId;
    await userActionService.saveBounceRate(domain, userId);
    res.status(201).json({ message: '이탈여부 전송 성공' });
  }),

  saveUserDevice: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userId = req.cookies.userId;
    await userDeviceService.saveUserDevice({ ...req.body, domain, userId });
    res.status(201).json({ message: '유저 디바이스 정보 전송 성공' });
  }),

  saveUserInfo: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userId = req.cookies.userId;
    await userInfoService.saveUserInfo({ ...req.body, domain, userId });
    res.status(201).json({ message: '유저 정보 전송 성공' });
  }),

  saveReferrer: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userId = req.cookies.userId;
    await userPageInfoService.saveReferrer({ ...req.body, domain, userId });
    res.status(201).json({ message: '유입 경로 저장완료' });
  }),

  savePageLoadTime: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userId = req.cookies.userId;
    await userPageInfoService.savePageLoadTime({ ...req.body, domain, userId });
    res.send(201).json('페이지 로드 시간 저장완료');
  }),

  savePageViewCount: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const { url } = req.body;
    if (!url) {
      res.status(400).json({ message: 'domain과 url은 필수입니다.' });
    }
    const today = new Date().toISOString().split('T')[0];
    const updatedVisitCount = await userPageInfoService.savePageViewCount({
      domain,
      url,
      date: today,
    });
    res.status(200).json({ message: '페이지 방문 횟수 저장 완료', data: updatedVisitCount });
  }),
};
