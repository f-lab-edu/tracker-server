import { Request, Response } from 'express';
import { userDeviceService } from '../services/userDeviceService';
import { wrapAsync } from '../utils/wrapAsync';
export const userDeviceController = {
  saveUserDevice: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userId = req.cookies.userId;
    await userDeviceService.saveUserDevice({ ...req.body, domain, userId });
    res.status(201).json({ message: '유저 디바이스 정보 전송 성공' });
  }),

  getBrowserStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userBrowserStats = await userDeviceService.getBrowserStats(domain);
    res.status(200).json(userBrowserStats);
  }),

  getOsStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userOsStats = await userDeviceService.getOsStats(domain);
    res.status(200).json(userOsStats);
  }),

  getDeviceStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userDeviceStats = await userDeviceService.getDeviceStats(domain);
    res.status(200).json(userDeviceStats);
  }),

  getResolutionStats: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const userResolutionStats = await userDeviceService.getResolutionStats(domain);
    res.status(200).json(userResolutionStats);
  }),
};
