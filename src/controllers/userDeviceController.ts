import { Request, Response } from 'express';
import { userDeviceService } from '../services/userDeviceService';

export const userDeviceController = {
  saveUserDevice: async (req: Request, res: Response) => {
    try {
      await userDeviceService.saveUserDevice(req.body);
      res.status(201).json({ message: '유저 디바이스 정보 전송 성공' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getBrowserStats: async (req: Request, res: Response) => {
    try {
      const { domain } = req.params;
      const userBrowserStats = await userDeviceService.getBrowserStats(domain);
      res.status(200).json(userBrowserStats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getOsStats: async (req: Request, res: Response) => {
    try {
      const { domain } = req.params;
      const userOsStats = await userDeviceService.getOsStats(domain);
      res.status(200).json(userOsStats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getDeviceStats: async (req: Request, res: Response) => {
    try {
      const { domain } = req.params;
      const userDeviceStats = await userDeviceService.getDeviceStats(domain);
      res.status(200).json(userDeviceStats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },

  getResolutionStats: async (req: Request, res: Response) => {
    try {
      const { domain } = req.params;
      const userResolutionStats = await userDeviceService.getResolutionStats(domain);
      res.status(200).json(userResolutionStats);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버 내부 오류' });
    }
  },
};
