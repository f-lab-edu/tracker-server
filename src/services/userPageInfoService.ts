import { Op } from 'sequelize';
import sequelize from '../config/db';
import { UserPageInfoModel } from '../models/userPageInfoModel';
import { PageInfo, PageLoadInfo } from '../types/userPageType';

export const userPageInfoService = {
  saveReferrer: async (data: PageInfo) => {
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

  savePageInfo: async (data: PageLoadInfo) => {
    const today = new Date();
    const existingRecord = await UserPageInfoModel.findOne({
      where: { domain: data.domain, url: data.url, userId: data.userId, date: today },
    });
    if (existingRecord) {
      return await UserPageInfoModel.update(
        { loadTime: data.loadTime, visitCount: sequelize.literal('visitCount + 1') },
        { where: { domain: data.domain, url: data.url, userId: data.userId, date: today } }
      );
    } else {
      return await UserPageInfoModel.create({ ...data, visitCount: 1, date: today });
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

  getAveragePageLoadTime: async (domain: string) => {
    const avgLoadTimes = await UserPageInfoModel.findAll({
      where: { domain },
      attributes: ['url', [sequelize.fn('AVG', sequelize.col('loadTime')), 'avgLoadTime']],
      group: ['url'],
      raw: true,
    });
    return avgLoadTimes;
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
