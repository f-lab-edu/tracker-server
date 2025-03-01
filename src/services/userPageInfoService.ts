import { Op } from 'sequelize';
import sequelize from '../config/db';
import { UserPageInfoModel } from '../models/userPageInfoModel';

interface PageInfo {
  userId: string;
  domain: string;
  referrer: string;
  url: string;
  loadTime: number;
  event: string;
}
interface PageLoadInfo {
  userId: string;
  domain: string;
  url: string;
  loadTime: number;
}
interface PageViewCountInfo {
  domain: string;
  url: string;
  date: string;
}

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

  getReferrerStats: async (domain: string) => {
    const referrerCounts = await UserPageInfoModel.findAll({
      where: { domain },
      attributes: ['referrer', [sequelize.fn('COUNT', '*'), 'count']],
      group: ['referrer'],
      raw: true,
    });
    return referrerCounts;
  },

  savePageLoadTime: async (data: PageLoadInfo) => {
    const existingRecord = await UserPageInfoModel.findOne({
      where: { domain: data.domain, url: data.url, userId: data.userId },
    });

    if (existingRecord) {
      return await UserPageInfoModel.update(
        { loadTime: data.loadTime },
        { where: { domain: data.domain, url: data.url, userId: data.userId } }
      );
    } else {
      return await UserPageInfoModel.create({ ...data });
    }
  },

  getAveragePageLoadTime: async (domain: string) => {
    const avgLoadTimes = await UserPageInfoModel.findAll({
      where: { domain },
      attributes: ['pageUrl', [sequelize.fn('AVG', sequelize.col('loadTime')), 'avgLoadTime']],
      group: ['pageUrl'],
      raw: true,
    });
    return avgLoadTimes;
  },

  savePageViewCount: async (data: PageViewCountInfo) => {
    const { domain, url, date } = data;
    const existingRecord = await UserPageInfoModel.findOne({
      where: { domain, url, date },
    });
    if (existingRecord) {
      return await UserPageInfoModel.update(
        { visitCount: sequelize.literal('visitCount + 1') },
        { where: { domain, url, date } }
      );
    } else {
      return await UserPageInfoModel.create({ domain, url, visitCount: 1, date });
    }
  },

  getPageViewCounts: async (domain: string, startDate: string, endDate: string) => {
    return await UserPageInfoModel.findAll({
      where: {
        domain,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        'pageUrl',
        'date',
        [sequelize.fn('SUM', sequelize.col('visitCount')), 'visitCount'],
      ],
      group: ['pageUrl', 'date'],
      order: [['date', 'ASC']],
      raw: true,
    });
  },
};
