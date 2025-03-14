import express, { NextFunction, Request, Response } from 'express';
import { UUIDV4 } from 'sequelize';

export const trackerUserSetCookieId = express.Router();

trackerUserSetCookieId.get('/userCookieId', (req: Request, res: Response, next: NextFunction) => {
  let userId = req.body.userId;
  if (!userId) {
    userId = UUIDV4();
  }
  res.setHeader(
    'Set-Cookie',
    `userId=${userId}; Max-Age=999999999 Path=/; SameSite=None; Secure; HttpOnly`
  );
  res.send({ success: true });
  next();
});
