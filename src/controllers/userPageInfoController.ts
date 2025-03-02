import { Request, Response } from 'express';
import { userPageInfoService } from '../services/userPageInfoService';
import { wrapAsync } from '../utils/wrapAsync';

export const userPageInfoController = {
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
