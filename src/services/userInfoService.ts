import { UserInfoModel } from '../models/userInfoModel';
interface CreateUserInfo {
  userId: string;
  country: string;
  language: string;
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
