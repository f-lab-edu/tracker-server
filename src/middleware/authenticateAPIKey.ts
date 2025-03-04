import { NextFunction, Request, Response } from 'express';
import { getAPIKeyFromDB } from '../services/apiKeyService';

export async function authenticateAPIKey(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.includes('Bearer ')) {
    return res.status(401).json({ error: 'api key가 없습니다' });
  }
  const apikey = authHeader.split(' ')[1];
  try {
    const apiKeyData = await getAPIKeyFromDB(apikey);
    if (!apiKeyData) {
      return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    }
    res.locals.domain = { domain: apiKeyData };
    next();
  } catch (error) {
    console.error('API Key 인증 중 오류 발생:', error);
    return res.status(500).json({ error: '내부 서버 오류' });
  }
}
