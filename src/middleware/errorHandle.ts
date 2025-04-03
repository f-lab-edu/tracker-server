import { NextFunction, Request, Response } from 'express';

export const errorHandle = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }
  if (
    err.message === 'apiKey 인증실패' ||
    err.message === '로그인 필요' ||
    err.message === '이미 로그아웃'
  ) {
    return res.status(401).json({ message: err.message });
  }
  if (err.message === '회원가입 에러') {
    return res.status(409).json({ error: err.message });
  }

  return res.status(500).json({ message: '서버 내부 오류', err: err.message });
};
