import { Op } from 'sequelize';
import sequelize from '../config/db';
import { UserPageInfoModel } from '../models/userPageInfoModel';
import { PageInfo, PageInfoRefer } from '../types/userPageType';

export const userPageInfoService = {
  saveReferrer: async (data: PageInfoRefer) => {
    const existingRecord = await UserPageInfoModel.findOne({
      where: { userId: data.userId, domain: data.domain },
    });
    if (!existingRecord) {
      const referrer = data.referrer || 'direct';
      const firstTimeAccessPageInfo = await UserPageInfoModel.create({
        ...data,
        referrer,
      });
      return firstTimeAccessPageInfo;
    }
    return null;
  },

  savePageInfo: async (data: PageInfo) => {
    const today = new Date().toISOString().split('T')[0];

    const [record, created] = await UserPageInfoModel.findOrCreate({
      where: {
        domain: data.domain,
        url: data.url,
        userId: data.userId,
        date: today,
      },
      defaults: {
        ...data,
        visitCount: 1,
        date: today,
      },
    });

    if (!created) {
      await record.increment('visitCount');
    }
  },

  getReferrerStats: async (domain: string) => {
    const referrerCounts = await UserPageInfoModel.findAll({
      where: { domain },
      attributes: ['referrer', [sequelize.fn('COUNT', '*'), 'count']],
      group: ['referrer'],
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

  getPerDayVisitorCounts: async (domain: string, startDate: string, endDate: string) => {
    return await UserPageInfoModel.findAll({
      where: {
        domain,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('visitCount')), 'totalVisitCount'],
        [
          sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('userId'))),
          'uniqueVisitors',
        ],
      ],
      group: ['date'],
      order: [['date', 'ASC']],
      raw: true,
    });
  },

  getTotalVisitors: async (domain: string) => {
    return await UserPageInfoModel.findAll({
      where: { domain },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('visitCount')), 'totalVisitCount'],
        [
          sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('userId'))),
          'uniqueVisitors',
        ],
      ],
      raw: true,
    });
  },
};
