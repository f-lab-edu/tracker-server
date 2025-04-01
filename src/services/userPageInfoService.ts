import { Op, QueryTypes } from 'sequelize';
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
    const now = new Date();
    const today = new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const pathname = new URL(data.url).pathname;
    await sequelize.query(
      `
      INSERT INTO userPageInfos (userId, domain, url, referrer, date, visitCount, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())
      ON DUPLICATE KEY UPDATE 
        visitCount = visitCount + 1,
        updatedAt = NOW();
      `,
      {
        replacements: [data.userId, data.domain, pathname, null, today],
        type: QueryTypes.INSERT,
      }
    );
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
            SUBSTRING(referrer, LOCATE('/', referrer, LOCATE('//', referrer) + 2))
          `),
          'path',
        ],
        [sequelize.fn('COUNT', '*'), 'count'],
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

  getPerDayVisitorCounts: async (domain: string, startDate: string, endDate: string) => {
    return await UserPageInfoModel.findAll({
      where: {
        domain,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: [
        'date',
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
