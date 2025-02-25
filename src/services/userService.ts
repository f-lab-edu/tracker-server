import { UserInfoModel } from '../models/userModel';
interface CreateUserInfo {
  userId: string;
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
    const userInfo = await UserInfoModel.create({ ...data });
    return userInfo;
  },

  getUserInfo: async () => {
    const getUserInfo = await UserInfoModel.findAll();
    return getUserInfo;
  },
};
