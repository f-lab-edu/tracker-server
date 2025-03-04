import { apiKeyModel } from '../models/apikeyModel';

export async function getAPIKeyFromDB(apiKey: string) {
  const apiKeyData = await apiKeyModel.findOne({
    where: { apiKey },
    attributes: ['domain'],
  });

  return apiKeyData ? apiKeyData.toJSON() : null;
}
