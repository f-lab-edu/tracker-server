import { HeartBeatModel } from '../models/heartBeatModel';

interface HeartBeat {
  userId: string;
  page: string;
  timestamps: string;
  status: string;
  event: string;
}

export const HeartBeatService = {
  sendOnline: async (data: HeartBeat) => {
    const online = await HeartBeatModel.create({ ...data });
    return online;
  },
  sendOffline: async (data: HeartBeat) => {
    const offline = await HeartBeatModel.create({ ...data });
    return offline;
  },
};
