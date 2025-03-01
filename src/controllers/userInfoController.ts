import { Request, Response } from 'express';
import { userInfoService } from '../services/userInfoService';

export const userInfoController = {
  saveUserInfo: async (req: Request, res: Response) => {
    try {
      await userInfoService.saveUserInfo(req.body);
      res.status(201).json({ message: '유저 정보 전송 성공' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getLanguageStats: async (req: Request, res: Response) => {
    try {
      const domain = req.params.domain;
      const languageStats = await userInfoService.getLanguageStats(domain);
      res.status(200).json(languageStats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getCountryStats: async (req: Request, res: Response) => {
    try {
      const domain = req.params.domain;
      const countryStats = await userInfoService.getCountryStats(domain);
      res.status(200).json(countryStats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getVisitedUsersRate: async (req: Request, res: Response) => {
    try {
      const domain = req.params.domain;
      const getVisitedUsersRate =
        await userInfoService.getVisitedUsersRate(domain);
      res.status(200).json(getVisitedUsersRate);
    } catch (err) {
      console.error(err);
      res.status(200).json({ message: '서버 내부 오류' });
    }
  },
};
