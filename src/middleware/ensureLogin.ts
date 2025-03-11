import { NextFunction, Request, Response } from 'express';

export const ensureLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.client) {
    next(new Error('로그인 필요'));
  }
  next();
};
