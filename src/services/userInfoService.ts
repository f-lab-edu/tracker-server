import sequelize from '../config/db';
import { UserInfoModel } from '../models/userInfoModel';
import { UserInfo } from '../types/userInfoType';

export const userInfoService = {
  saveUserInfo: async (data: UserInfo) => {
    await UserInfoModel.create({ ...data });
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
};
