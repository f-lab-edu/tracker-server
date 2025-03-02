import { Request, Response } from 'express';
import { userInfoService } from '../services/userInfoService';
import { wrapAsync } from '../utils/wrapAsync';

export const userInfoController = {
  saveUserInfo: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userId = req.cookies.userId;
    await userInfoService.saveUserInfo({ ...req.body, domain, userId });
    res.status(201).json({ message: '유저 정보 전송 성공' });
  }),

  getLanguageStats: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const languageStats = await userInfoService.getLanguageStats(domain);
    res.status(200).json(languageStats);
  }),

  getCountryStats: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const countryStats = await userInfoService.getCountryStats(domain);
    res.status(200).json(countryStats);
  }),

  getVisitedUsersRate: wrapAsync(async (req: Request, res: Response) => {
    const domain = req.params.domain;
    const getVisitedUsersRate = await userInfoService.getVisitedUsersRate(domain);
    res.status(200).json(getVisitedUsersRate);
  }),
};
