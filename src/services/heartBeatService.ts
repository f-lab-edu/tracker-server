import { heartbeatModel } from '../models/heartbeatModel';

export const heartbeatService = {
  findByUserId: async (domain: string, userId: string) => {
    return await heartbeatModel.findOne({ where: { domain, userId } });
  },

  createHeartbeat: async (domain: string, userId: string) => {
    const now = new Date();
    return await heartbeatModel.create({
      domain,
      userId,
      firstOnlineTime: now,
      lastUpdateTime: now,
      isOnline: true,
    });
  },

  updateHeartbeat: async (domain: string, userId: string, newIsOnline: boolean) => {
    const now = new Date();
    return await heartbeatModel.update(
      { lastUpdateTime: now, isOnline: newIsOnline },
      { where: { domain, userId } }
    );
  },

  getOnlineUsersCount: async (domain: string) => {
    const onlineUsersCount = await heartbeatModel.count({
      where: { domain, isOnline: true },
    });
    return onlineUsersCount;
  },
};
