import { Op } from 'sequelize';
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

  updateHeartbeat: async (domain: string, userId: string, newIsOnline: boolean) => {
    const now = new Date();
    return await userConnectionModel.update(
      { lastHeartbeatTime: now, isOnline: newIsOnline },
      { where: { domain, userId } }
    );
  },

  getOnlineUsersCount: async (domain: string) => {
    const onlineUsersCount = await userConnectionModel.count({
      where: { domain, isOnline: true },
    });
    return onlineUsersCount;
  },

  checkInactiveUsers: async () => {
    const domains = await userConnectionModel.findAll({
      attributes: ['domain'],
      group: ['domain'],
    });
    const threshold = new Date(Date.now() - 60 * 1000);
    for (const domainRow of domains) {
      const domain = domainRow.get('domain');
      await userConnectionModel.update(
        { isOnline: false },
        {
          where: {
            domain,
            isOnline: true,
            [Op.or]: [{ lastHeartbeatTime: null }, { lastHeartbeatTime: { [Op.lt]: threshold } }],
          },
        }
      );
    }
  },
};
