import { Request, Response } from 'express';
import { userInfoService } from '../services/userService';

export const userInfoController = {
  createUserInfo: async (req: Request, res: Response) => {
    try {
      await userInfoService.createUserInfo(req.body);
      res.status(201).json({ message: '유저 정보 전송 성공' });
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
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },
};
