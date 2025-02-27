import { Request, Response } from 'express';
import { userPageInfoService } from '../services/userPageService';

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
      res.status(201).json(referrerStatus);
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
      const updatedVisitCount = await userPageInfoService.savePageViewCount(req.body);
      res.status(200).json({ message: '페이지 방문 횟수 저장 완료', data: updatedVisitCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getPageViewCount: async (req: Request, res: Response) => {
    try {
      const domain = req.params.domain;
      const pageViewCounts = await userPageInfoService.getPageViewCounts(domain);
      res.status(200).json(pageViewCounts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },
};
