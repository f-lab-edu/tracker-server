import { NextFunction, Request, Response } from 'express';
import { getAPIKeyFromDB } from '../services/apiKeyService';

export async function authenticateAPIKey(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.includes('Bearer ')) {
    return res.status(401).json({ error: 'api key가 없습니다' });
  }
  const apiKey = authHeader.split(' ')[1];
  try {
    const apiKeyData = await getAPIKeyFromDB(apiKey);
    if (!apiKeyData) {
      return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    }
    res.locals.domain = { domain: apiKeyData };
    next();
  } catch (err) {
    next(err);
  }
}
