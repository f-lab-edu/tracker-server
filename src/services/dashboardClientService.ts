import bcrypt from 'bcryptjs';
import { v4 as UUIDV4 } from 'uuid';
import { DashboardClientModel } from '../models/dashboardClientModel';
import { ClientType } from '../types/dashboardClientType';

export const dashboardClientService = {
  enrollClient: async (email: string, password: string, domain: string) => {
    const apiKey = UUIDV4();
    const hashedApiKey = await bcrypt.hash(apiKey, 10);
    const hashedPassword = await bcrypt.hash(password, 10);
    await DashboardClientModel.create({
      email,
      hashedPassword,
      domain,
      hashedApiKey,
    });
    return apiKey;
  },

  loginClient: async (email: string, password: string) => {
    const client = (await DashboardClientModel.findOne({
      where: { email },
      attributes: ['hashedPassword', 'domain'],
      raw: true,
    })) as ClientType | null;
    if (!client) {
      throw new Error('등록된 유저가 아닙니다.');
    }
    const isValidPassword = await bcrypt.compare(password, client.hashedPassword);
    if (!isValidPassword) {
      throw new Error('비밀번호가 올바르지 않습니다.');
    }
    return client.domain;
  },
};
