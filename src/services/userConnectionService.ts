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
    console.log(' checkInactiveUsers 실행됨', new Date().toISOString());
    const threshold = new Date(Date.now() - 60 * 1000);
    for (const domainRow of domains) {
      const domain = domainRow.get('domain');
      const [affectedCount] = await userConnectionModel.update(
        { isOnline: false },
        {
          where: {
            domain,
            lastHeartbeatTime: { [Op.lt]: threshold },
            isOnline: true,
          },
        }
      );
      console.log(`[${domain}] offline 처리된 유저 수: ${affectedCount}`);
    }
  },
};
