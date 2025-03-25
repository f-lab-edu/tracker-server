import { NextFunction, Request, Response } from 'express';

export function parseBeaconBody(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = JSON.parse(req.body);
    next();
  } catch (error) {
    console.error('sendBeacon body 파싱 실패:', error);
    res.status(400).json({ message: '잘못된 JSON 형식입니다.' });
  }
}
