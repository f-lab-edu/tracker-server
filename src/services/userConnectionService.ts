import { userConnectionModel } from '../models/userConnectionModel';

export const userConnectionService = {
  findByUserId: async (domain: string, userId: string) => {
    return await userConnectionModel.findOne({ where: { domain, userId } });
  },

  createIsOnline: async (domain: string, userId: string) => {
    const now = new Date();
    return await userConnectionModel.create({
      domain,
      userId,
      firstOnlineTime: now,
      lastUpdateTime: now,
      isOnline: true,
    });
  },

  updateIsOnline: async (domain: string, userId: string, newIsOnline: boolean) => {
    const now = new Date();
    return await userConnectionModel.update(
      { lastUpdateTime: now, isOnline: newIsOnline },
      { where: { domain, userId } }
    );
  },

  getOnlineUsersCount: async (domain: string) => {
    const onlineUsersCount = await userConnectionModel.count({
      where: { domain, isOnline: true },
    });
    return onlineUsersCount;
  },
};
