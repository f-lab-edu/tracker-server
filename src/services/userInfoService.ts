import { Op } from 'sequelize';
import sequelize from '../config/db';
import { UserInfoModel } from '../models/userInfoModel';
import { UserInfo } from '../types/userInfoType';

export const userInfoService = {
  saveUserInfo: async (data: UserInfo) => {
    const existingUser = await UserInfoModel.findOne({
      where: { userId: data.userId, domain: data.domain },
    });
    if (existingUser) {
      await UserInfoModel.update(
        { visitedCount: sequelize.literal('visitedCount + 1') },
        { where: { userId: data.userId, domain: data.domain } }
      );
    } else {
      const userInfo = await UserInfoModel.create({ ...data, visitedCount: 1 });
      return userInfo;
    }
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
      where: { domain, visitedCount: { [Op.gte]: 2 } },
    });
    const visitedUsersRate = totalUsers > 0 ? (visitedUsers / totalUsers) * 100 : 0;
    return { domain, visitedUsersRate };
  },
};
