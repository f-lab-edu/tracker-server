import { DashboardClientModel } from '../models/dashboardClientModel';

export async function getClientDomain(apiKey: string) {
  const clientDomain = await DashboardClientModel.findOne({
    where: { apiKey },
    attributes: ['domain'],
  });
  if (!clientDomain) {
    throw new Error('apiKey 인증에러');
  }
  const clientDomainForSdk: { domain: string } = clientDomain.get({ plain: true });

  return clientDomainForSdk;
}
