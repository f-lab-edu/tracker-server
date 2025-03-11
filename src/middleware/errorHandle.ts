import { NextFunction, Request, Response } from 'express';

export const errorHandle = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }
  if (
    err.message === '도메인 에러' ||
    err.message === 'apiKey 인증실패' ||
    err.message === '로그인 필요' ||
    err.message === '이미 로그아웃'
  ) {
    res.status(401).json({ message: err.message });
  }

  res.status(500).json({ message: '서버 내부 오류', err: err.message });
};
