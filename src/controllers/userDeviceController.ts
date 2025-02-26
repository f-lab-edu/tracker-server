import { Request, Response } from 'express';
import { userDeviceService } from '../services/userDeviceService';

export const userDeviceController = {
  createUserDevice: async (req: Request, res: Response) => {
    try {
      await userDeviceService.createUserDevice(req.body);
      res.status(201).json({ message: '유저 디바이스 정보 전송 성공' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getUserDevice: async (req: Request, res: Response) => {
    try {
      const userDevice = await userDeviceService.getUserDevice();
      res.status(201).json(userDevice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },
};
