import { NextFunction, Request, Response } from 'express';
import session from 'express-session';
export function createSession() {
  return (req: Request, res: Response, next: NextFunction) => {
    session({
      secret: process.env.SESSION_SECRET || 'default_secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: true },
    })(req, res, (err) => {
      if (err) {
        console.error('세션 생성오류:', err);
        return res.status(500).json({ error: '세션 초기화 실패' });
      }
      next();
    });
  };
}
