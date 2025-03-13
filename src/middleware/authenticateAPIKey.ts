import { NextFunction, Request, RequestHandler, Response } from 'express';
import { getClientDomain } from '../services/apiKeyService';

export const authenticateAPIKey: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.includes('Bearer ')) {
    res.status(401).json({ error: 'api key가 없습니다' });
    return;
  }
  const apiKey = authHeader.split(' ')[1];
  try {
    const { domain } = await getClientDomain(apiKey);
    res.locals.domain = domain;
    next();
  } catch (err) {
    next(err);
  }
};
