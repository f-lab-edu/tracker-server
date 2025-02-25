import { v4 as uuidv4 } from 'uuid';
import { UserInfoModel } from '../models/userModel';
interface CreateUserInfo {
  page: string;
  userPrevPage: string;
  userAccessTime: string;
  userBrowser: string;
  userOs: string;
  userCountry: string;
  userIsMobile: boolean;
  userResolution: string;
  userLanguage: string;
  event: string;
}

export const userInfoService = {
  createUserInfo: async (data: CreateUserInfo) => {
    const userId = uuidv4();
    const userInfo = await UserInfoModel.create({ ...data, userId });
    return userInfo;
  },

  getUserInfo: async () => {
    const getUserInfo = await UserInfoModel.findAll();
    return getUserInfo;
  },
};
