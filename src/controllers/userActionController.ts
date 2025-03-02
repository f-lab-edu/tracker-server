import { Request, Response } from 'express';
import { userActionService } from '../services/userActionService';
import { wrapAsync } from '../utils/wrapAsync';

export const userActionController = {
  saveUserScrollDepth: wrapAsync(async (req: Request, res: Response) => {
    await userActionService.saveUserScrollDepth(req.body);
    res.status(201).json({ message: '스크롤깊이 전송 성공' });
  }),

  saveBounceRate: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const { userId } = req.body;
    await userActionService.saveBounceRate(domain, userId);
    res.status(201).json({ message: '이탈여부 전송 성공' });
  }),

  getPerPageAverageScrollDepth: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const perPageAverageScrollDepth = await userActionService.getPerPageAverageScrollDepth(domain);
    res.status(200).json(perPageAverageScrollDepth);
  }),

  getBounceRate: wrapAsync(async (req: Request, res: Response) => {
    const { domain } = req.params;
    const bounceRate = await userActionService.getBounceRate(domain);
    res.status(200).json(bounceRate);
  }),
};
