import sequelize from '../config/db';
import { heartbeatModel } from '../models/heartbeatModel';
import { UserActionModel } from '../models/userActionModel';
import { UserDeviceModel } from '../models/userDeviceModel';
import { UserInfoModel } from '../models/userInfoModel';
import { UserPageInfoModel } from '../models/userPageInfoModel';
import { UserScroll } from '../types/userActionType';
import { UserDeviceInfo } from '../types/userDeviceType';
import { UserInfo } from '../types/userInfoType';
import { PageInfo, PageLoadInfo, PageViewCountInfo } from '../types/userPageType';

export const trackerSdkService = {
  findByUserId: async (domain: string, userId: string) => {
    return await heartbeatModel.findOne({ where: { domain, userId } });
  },

  createHeartbeat: async (domain: string, userId: string) => {
    const now = new Date();
    return await heartbeatModel.create({
      domain,
      userId,
      firstOnlineTime: now,
      lastUpdateTime: now,
      isOnline: true,
    });
  },

  updateHeartbeat: async (domain: string, userId: string, newIsOnline: boolean) => {
    const now = new Date();
    return await heartbeatModel.update(
      { lastUpdateTime: now, isOnline: newIsOnline },
      { where: { domain, userId } }
    );
  },

  saveUserScrollDepth: async (data: UserScroll) => {
    const existingScrolled = await UserActionModel.findOne({
      where: { userId: data.userId, domain: data.domain, url: data.url },
    });
    if (existingScrolled) {
      const previousScrollDepth = existingScrolled.scrollDepth ?? 0;
      if (data.scrollDepth > previousScrollDepth) {
        await UserActionModel.update(
          { scrollDepth: data.scrollDepth },
          { where: { userId: data.userId, domain: data.domain, url: data.url } }
        );
      }
    } else {
      await UserActionModel.create({ ...data });
    }
  },

  saveBounceRate: async (userId: string, domain: string) => {
    await UserActionModel.update({ isBounced: true }, { where: { userId, domain } });
  },

  saveUserDevice: async (data: UserDeviceInfo) => {
    const userDevice = await UserDeviceModel.upsert({ ...data });
    return userDevice;
  },

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
};
