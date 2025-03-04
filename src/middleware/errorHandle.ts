import { NextFunction, Request, Response } from 'express';

export const errorHandle = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ message: '서버 내부 오류', err: err.message });
};
