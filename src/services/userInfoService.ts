import { Op } from 'sequelize';
import sequelize from '../config/db';
import { UserInfoModel } from '../models/userInfoModel';
import { UserInfo } from '../types/userInfoType';

export const userInfoService = {
  saveUserInfo: async (data: UserInfo) => {
    const today = new Date().toISOString().slice(0, 10);
    await UserInfoModel.create({ ...data, visitDate: today });
  },

  getLanguageStats: async (domain: string) => {
    return await UserInfoModel.findAll({
      attributes: ['language', [sequelize.fn('COUNT', '*'), 'count']],
      where: { domain },
      group: ['language'],
      raw: true,
    });
  },

  getCountryStats: async (domain: string) => {
    return await UserInfoModel.findAll({
      attributes: ['country', [sequelize.fn('COUNT', '*'), 'count']],
      where: { domain },
      group: ['country'],
      raw: true,
    });
  },

  getVisitedUsersRate: async (domain: string) => {
    const visitedUsers = await UserInfoModel.findAll({
      attributes: ['userId'],
      where: { domain },
      group: ['userId'],
      having: sequelize.literal('COUNT(*) >= 2'),
      raw: true,
    });
    const totalUsers = await UserInfoModel.count({
      where: { domain },
      distinct: true,
      col: 'userId',
    });
    const visitedUsersRate = totalUsers > 0 ? (visitedUsers.length / totalUsers) * 100 : 0;
    return { domain, visitedUsersRate };
  },

  getPerDayVisitorCounts: async (domain: string, startDate: string, endDate: string) => {
    return await UserInfoModel.findAll({
      where: {
        domain,
        visitDate: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        'visitDate',
        [sequelize.fn('COUNT', sequelize.col('userId')), 'totalVisitCount'],
        [
          sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('userId'))),
          'uniqueVisitors',
        ],
      ],
      group: ['visitDate'],
      order: [['visitDate', 'ASC']],
      raw: true,
    });
  },

  getTotalVisitors: async (domain: string) => {
    return await UserInfoModel.findAll({
      where: { domain },
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('userId')), 'totalVisitCount'],
        [
          sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('userId'))),
          'uniqueVisitors',
        ],
      ],
      raw: true,
    });
  },
};
