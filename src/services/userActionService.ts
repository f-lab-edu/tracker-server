import { Op } from 'sequelize';
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

  saveBounceRate: async (domain: string, userId: string, url: string) => {
    await UserActionModel.create({
      domain,
      userId,
      url,
      scrollDepth: null,
      isBounced: true,
    });
  },

  getPerPageAverageScrollDepth: async (domain: string) => {
    const results = await UserActionModel.findAll({
      where: {
        domain,
        scrollDepth: { [Op.ne]: null },
      },
      attributes: ['url', [sequelize.fn('AVG', sequelize.col('scrollDepth')), 'avgScrollDepth']],
      group: ['url'],
      raw: true,
    });
    return results;
  },

  getPerPageBounceRate: async (domain: string) => {
    const bouncedUsersPerPage = await UserActionModel.findAll({
      where: {
        domain,
        isBounced: true,
      },
      attributes: [
        [
          sequelize.literal(`
            SUBSTRING(url, LOCATE('/', url, LOCATE('//', url) + 2))
          `),
          'url',
        ],
        [sequelize.fn('COUNT', '*'), 'bouncedUsers'],
      ],
      group: ['url'],
      raw: true,
    });
    return bouncedUsersPerPage;
  },
};
