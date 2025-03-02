import { Request, Response } from 'express';
import { heartbeatService } from '../services/heartbeatService';
import { wrapAsync } from '../utils/wrapAsync';

export const heartbeatController = {
  saveHeartbeat: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userId = req.cookies.userId;
    const { isOnline } = req.body;
    const existingUser = await heartbeatService.findByUserId(domain, userId);
    if (!existingUser) {
      await heartbeatService.createHeartbeat(domain, userId);
      res.status(201).json({ message: '초기 heartbeat 기록 성공' });
    } else {
      await heartbeatService.updateHeartbeat(domain, userId, isOnline);
      res.status(200).json({ message: 'heartbeat 업데이트 성공' });
    }
  }),

  getOnlineUsersCount: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const onlineUsersCount = await heartbeatService.getOnlineUsersCount(domain);
    res.status(200).json({ onlineUsersCount });
  }),
};
