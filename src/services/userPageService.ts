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
    const existingRecord = await UserPageInfoModel.findOne({
      where: { domain: data.domain, url: data.url },
    });
    if (existingRecord) {
      return await UserPageInfoModel.update(
        { visitCount: sequelize.literal('visitCount + 1') },
        { where: { domain: data.domain, url: data.url } }
      );
    } else {
      return await UserPageInfoModel.create({ ...data, visitCount: 1 });
    }
  },

  getPageViewCounts: async (domain: string) => {
    return await UserPageInfoModel.findAll({
      where: { domain },
      attributes: ['pageUrl', [sequelize.fn('COUNT', '*'), 'visitCount']],
      group: ['pageUrl'],
      raw: true,
    });
  },
};
