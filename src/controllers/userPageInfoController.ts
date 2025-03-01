import { Request, Response } from 'express';
import { userPageInfoService } from '../services/userPageInfoService';

export const userPageInfoController = {
  saveReferrer: async (req: Request, res: Response) => {
    try {
      await userPageInfoService.saveReferrer(req.body);
      res.status(200).json({ message: '유입 경로 저장완료' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getReferrerStats: async (req: Request, res: Response) => {
    try {
      const domain = req.params.domain;
      const referrerStatus = await userPageInfoService.getReferrerStats(domain);
      res.status(200).json(referrerStatus);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  savePageLoadTime: async (req: Request, res: Response) => {
    try {
      await userPageInfoService.savePageLoadTime(req.body);
      res.send(200).json('페이지 로드 시간 저장완료');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getAveragePageLoadTime: async (req: Request, res: Response) => {
    try {
      const domain = req.params.domain;
      const avgLoadTime = await userPageInfoService.getAveragePageLoadTime(domain);
      res.status(200).json(avgLoadTime);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  savePageViewCount: async (req: Request, res: Response) => {
    try {
      const { domain, url } = req.body;
      if (!domain || !url) {
        return res.status(400).json({ message: 'domain과 url은 필수입니다.' });
      }
      const today = new Date().toISOString().split('T')[0];
      const updatedVisitCount = await userPageInfoService.savePageViewCount({
        domain,
        url,
        date: today,
      });

      res.status(200).json({ message: '페이지 방문 횟수 저장 완료', data: updatedVisitCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getPageViewCount: async (req: Request, res: Response) => {
    try {
      const domain = req.params.domain;
      const { startDate, endDate } = req.query;
      if (typeof startDate !== 'string' || typeof endDate !== 'string') {
        return res.status(400).json({ message: '시작 날짜와 종료날짜 올바르게 입력하세요' });
      }
      const pageViewCounts = await userPageInfoService.getPageViewCounts(
        domain,
        startDate,
        endDate
      );
      res.status(200).json(pageViewCounts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },
};
