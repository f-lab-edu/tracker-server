import { UserDeviceModel } from '../models/userDeviceModel';

interface CreateUserDevice {
  userId: string;
  browser: string;
  isMobile: string;
  os: string;
  resolution: string;
  event: string;
}

export const userDeviceService = {
  createUserDevice: async (data: CreateUserDevice) => {
    const userDevice = await UserDeviceModel.create({ ...data });
    return userDevice;
  },

  getUserDevice: async () => {
    const getUserDevice = await UserDeviceModel.findAll();
    return getUserDevice;
  },
};
