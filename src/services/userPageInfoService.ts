import { Op } from 'sequelize';
import sequelize from '../config/db';
import { UserPageInfoModel } from '../models/userPageInfoModel';
import { PageInfo, PageInfoRefer } from '../types/userPageType';

export const userPageInfoService = {
  saveReferrer: async (data: PageInfoRefer) => {
    const referrer = data.referrer || 'direct';
    const newReferrer = await UserPageInfoModel.create({
      ...data,
      referrer,
    });
    return newReferrer;
  },

  savePageInfo: async (data: PageInfo) => {
    const now = new Date();
    const today = new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const pathname = new URL(data.url).pathname;
    const existingPageInfo = await UserPageInfoModel.findOne({
      where: {
        domain: data.domain,
        url: pathname,
        date: today,
      },
    });
    if (existingPageInfo) {
      await UserPageInfoModel.update(
        { visitCount: sequelize.literal('visitCount + 1') },
        {
          where: {
            domain: data.domain,
            url: pathname,
            date: today,
          },
        }
      );
    } else {
      await UserPageInfoModel.create({
        ...data,
        url: pathname,
        referrer: null,
        visitCount: 1,
        date: today,
      });
    }
  },

  getReferrerStats: async (domain: string) => {
    const referrerCounts = await UserPageInfoModel.findAll({
      where: {
        domain,
        referrer: { [Op.ne]: null },
      },
      attributes: [
        [
          sequelize.literal(`
            SUBSTRING(referrer, LOCATE('//', referrer) + 2, LOCATE('/', referrer, LOCATE('//', referrer) + 2) - LOCATE('//', referrer) - 2)
          `),
          'path',
        ],
        [sequelize.fn('SUM', sequelize.col('visitCount')), 'count'],
      ],
      group: ['path'],
      raw: true,
    });
    return referrerCounts;
  },

  getPerDayPageViewCounts: async (domain: string, startDate: string, endDate: string) => {
    return await UserPageInfoModel.findAll({
      where: {
        domain,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        'url',
        'date',
        [sequelize.fn('SUM', sequelize.col('visitCount')), 'visitCount'],
        [
          sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('userId'))),
          'uniqueVisitors',
        ],
      ],
      group: ['url', 'date'],
      order: [['date', 'ASC']],
      raw: true,
    });
  },
};
