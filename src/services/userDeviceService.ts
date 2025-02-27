import sequelize from '../config/db';
import { UserDeviceModel } from '../models/userDeviceModel';

interface UserDeviceInfo {
  userId: string;
  domain: string;
  browser: string;
  isMobile: string;
  os: string;
  resolution: string;
}

export const userDeviceService = {
  saveUserDevice: async (data: UserDeviceInfo) => {
    const userDevice = await UserDeviceModel.upsert({ ...data });
    return userDevice;
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
};
