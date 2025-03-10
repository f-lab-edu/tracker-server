import { NextFunction, Request, Response } from 'express';

export const errorHandle = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }
  if (
    err.message === '등록된 유저가 아닙니다.' ||
    err.message === '비밀번호가 올바르지 않습니다.' ||
    err.message === 'apiKey가 유효하지 않습니다'
  ) {
    res.status(401).json({ message: err.message });
  }

  res.status(500).json({ message: '서버 내부 오류', err: err.message });
};
