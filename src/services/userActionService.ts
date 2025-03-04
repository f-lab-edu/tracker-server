import sequelize from '../config/db';
import { UserActionModel } from '../models/userActionModel';
import { UserScroll } from '../types/userActionType';

export const userActionService = {
  saveUserScrollDepth: async (data: UserScroll) => {
    const existingScrolled = await UserActionModel.findOne({
      where: { userId: data.userId, domain: data.domain, url: data.url },
    });
    if (existingScrolled) {
      const previousScrollDepth = existingScrolled.scrollDepth ?? 0;
      if (data.scrollDepth > previousScrollDepth) {
        await UserActionModel.update(
          { scrollDepth: data.scrollDepth },
          { where: { userId: data.userId, domain: data.domain, url: data.url } }
        );
      }
    } else {
      await UserActionModel.create({ ...data });
    }
  },

  saveBounceRate: async (userId: string, domain: string) => {
    await UserActionModel.update({ isBounced: true }, { where: { userId, domain } });
  },

  getPerPageAverageScrollDepth: async (domain: string) => {
    const results = await UserActionModel.findAll({
      where: { domain },
      attributes: ['url', [sequelize.fn('AVG', sequelize.col('scrollDepth')), 'avgScrollDepth']],
      group: ['url'],
      raw: true,
    });
    return results;
  },

  getBounceRate: async (domain: string) => {
    const totalUsers = await UserActionModel.count({ where: { domain } });
    const bouncedUsers = await UserActionModel.count({
      where: { domain, isBounced: true },
    });
    const bounceRate = totalUsers > 0 ? (bouncedUsers / totalUsers) * 100 : 0;
    return { domain, bounceRate };
  },
};
