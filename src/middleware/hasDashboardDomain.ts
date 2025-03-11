import { NextFunction, Request, Response } from 'express';

export const hasDashboardDomain = (req: Request, res: Response, next: NextFunction) => {
  const domain = req.session.client?.domain;
  if (!domain) {
    return next(new Error('도메인 에러'));
  }
  res.locals.dashboardDomain = domain;
  next();
};
