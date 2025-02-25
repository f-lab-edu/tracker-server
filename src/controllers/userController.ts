import { Request, Response } from 'express';
import { userInfoService } from '../services/userService';

export const userInfoController = {
  createUserInfo: async (req: Request, res: Response) => {
    try {
      const userInfo = await userInfoService.createUserInfo(req.body);
      res.status(201).json(userInfo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getUserInfo: async (req: Request, res: Response) => {
    try {
      const userInfo = await userInfoService.getUserInfo();
      res.status(201).json(userInfo);
    } catch (err) {
      console.error(err, '무슨에러야? ');
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },
};
