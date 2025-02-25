import { Request, Response } from 'express';
import { HeartBeatService } from '../services/heartBeatService';

export const heartBeatController = {
  updateStatus: async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      if (status === 'online') {
        await HeartBeatService.sendOnline(req.body);
      } else if (status === 'offline') {
        await HeartBeatService.sendOffline(req.body);
      } else {
        res.status(400).json({ message: '유효하지않은 상태' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '내부 서버 오류' });
    }
  },
};
