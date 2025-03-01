import { heartbeatModel } from '../models/heartbeatModel';

export const heartbeatService = {
  findByUserId: async (userId: string) => {
    return await heartbeatModel.findOne({ where: { userId } });
  },
  createHeartbeat: async (userId: string) => {
    const now = new Date();
    return await heartbeatModel.create({
      userId,
      firstOnlineTime: now,
      lastUpdateTime: now,
      status: 'online',
    });
  },
  updateHeartbeat: async (userId: string, newStatus: string) => {
    const now = new Date();
    return await heartbeatModel.update(
      { lastUpdateTime: now, status: newStatus },
      { where: { userId } }
    );
  },
  getOnlineUsersCount: async () => {
    const onlineUsersCount = await heartbeatModel.count({
      where: { status: 'online' },
    });
    return onlineUsersCount;
  },
};
