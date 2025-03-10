import * as crypto from 'crypto';
import { DashboardClientModel } from '../models/dashboardClientModel';

export async function getClientDomain(apiKey: string) {
  const hashedApiKey = crypto.createHash('sha256').update(apiKey).digest('hex');
  const clientDomain = await DashboardClientModel.findOne({
    where: { hashedApiKey },
    attributes: ['domain'],
    raw: true,
  });
  if (!clientDomain) {
    throw new Error('apiKey 인증에러');
  }

  return clientDomain;
}
