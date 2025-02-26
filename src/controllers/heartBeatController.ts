import { Request, Response } from 'express';
import { heartbeatService } from '../services/heartbeatService';
export const heartbeatController = {
  async handleHeartbeat(req: Request, res: Response): Promise<void> {
    const { userId, status } = req.body;

    try {
      const existingRecord = await heartbeatService.findByUserId(userId);

      if (!existingRecord) {
        await heartbeatService.createHeartbeat(userId);
        res.status(201).json({ message: '초기 heartbeat 기록 성공' });
      } else {
        await heartbeatService.updateHeartbeat(userId, status);
        res.status(200).json({ message: 'heartbeat 업데이트 성공' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 에러' });
    }
  },

  async getOnlineUsersCount(res: Response) {
    try {
      const onlineUsersCount = await heartbeatService.getOnlineUsersCount();
      res.status(200).json({ onlineUsersCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버에러' });
    }
  },
};
