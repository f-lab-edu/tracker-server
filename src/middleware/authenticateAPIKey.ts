import { NextFunction, Request, RequestHandler, Response } from 'express';
import { getAPIKeyFromDB } from '../services/apiKeyService';

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
    const apiKeyData = await getAPIKeyFromDB(apiKey);
    if (!apiKeyData) {
      res.status(403).json({ error: 'Forbidden: Invalid API Key' });
      return;
    }
    res.locals.domain = apiKeyData;
    next();
  } catch (err) {
    next(err);
  }
};
