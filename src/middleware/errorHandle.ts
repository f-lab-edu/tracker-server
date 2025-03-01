import { Request, Response } from 'express';

export const errorHandle = (err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 내부 오류', err: err.message });
};
