import { Op } from 'sequelize';
import sequelize from '../config/db';
import { heartbeatModel } from '../models/heartbeatModel';
import { UserActionModel } from '../models/userActionModel';
import { UserDeviceModel } from '../models/userDeviceModel';
import { UserInfoModel } from '../models/userInfoModel';
import { UserPageInfoModel } from '../models/userPageInfoModel';

export const dashboardService = {
  getOnlineUsersCount: async (domain: string) => {
    const onlineUsersCount = await heartbeatModel.count({
      where: { domain, isOnline: true },
    });
    return onlineUsersCount;
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

  getBrowserStats: async (domain: string) => {
    return await UserDeviceModel.findAll({
      where: { domain },
      attributes: ['browser', [sequelize.fn('COUNT', '*'), 'count']],
      group: ['browser'],
      raw: true,
    });
  },

  getOsStats: async (domain: string) => {
    return await UserDeviceModel.findAll({
      where: { domain },
      attributes: ['os', [sequelize.fn('COUNT', '*'), 'count']],
      group: ['os'],
      raw: true,
    });
  },

  getDeviceStats: async (domain: string) => {
    return await UserDeviceModel.findAll({
      where: { domain },
      attributes: ['isMobile', [sequelize.fn('COUNT', '*'), 'count']],
      group: ['isMobile'],
      raw: true,
    });
  },

  getResolutionStats: async (domain: string) => {
    return await UserDeviceModel.findAll({
      where: { domain },
      attributes: ['resolution', [sequelize.fn('COUNT', '*'), 'count']],
      group: ['resolution'],
      raw: true,
    });
  },

  getLanguageStats: async (domain: string) => {
    const languageStats = await UserInfoModel.findAll({
      attributes: ['language', [sequelize.fn('COUNT', sequelize.col('language')), 'count']],
      where: { domain },
      group: ['language'],
    });
    return languageStats;
  },

  getCountryStats: async (domain: string) => {
    const countryStats = await UserInfoModel.findAll({
      attributes: ['country', [sequelize.fn('COUNT', sequelize.col('country')), 'count']],
      where: { domain },
      group: ['country'],
    });
    return countryStats;
  },

  getVisitedUsersRate: async (domain: string) => {
    const totalUsers = await UserInfoModel.count({ where: { domain } });
    const visitedUsers = await UserInfoModel.count({
      where: { domain, isVisitedUser: { [Op.gte]: 2 } },
    });
    const visitedUsersRate = totalUsers > 0 ? (visitedUsers / totalUsers) * 100 : 0;
    return { domain, visitedUsersRate };
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

  getPerPageViewCounts: async (domain: string, startDate: string, endDate: string) => {
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

  getPerVisitorCounts: async (domain: string, startDate: string, endDate: string) => {
    return await UserPageInfoModel.findOne({
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
      raw: true,
    });
  },

  getTotalVisitors: async (domain: string) => {
    return await UserPageInfoModel.findOne({
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
