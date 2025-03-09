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
      where: { domain },
      attributes: [
        'url',
        [
          sequelize.fn(
            'AVG',
            sequelize.literal(
              '(SELECT MAX(scrollDepth) FROM userActions AS ua WHERE ua.userId = userAction.userId AND ua.url = userAction.url)'
            )
          ),
          'avgScrollDepth',
        ],
      ],
      group: ['url'],
      raw: true,
    });
    return results;
  },

  getPerPageBounceRate: async (domain: string) => {
    const totalUsersPerPage = await UserActionModel.findAll({
      where: { domain },
      attributes: [
        'url',
        [sequelize.fn('COUNT', sequelize.literal('DISTINCT userId')), 'totalUsers'],
      ],
      group: ['url'],
      raw: true,
    });
    const bouncedUsersPerPage = await UserActionModel.findAll({
      where: { domain, isBounced: true },
      attributes: [
        'url',
        [sequelize.fn('COUNT', sequelize.literal('DISTINCT userId')), 'bouncedUsers'],
      ],
      group: ['url'],
      raw: true,
    });
    return { totalUsersPerPage, bouncedUsersPerPage };
  },
};
