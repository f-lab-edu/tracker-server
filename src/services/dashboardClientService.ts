import bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { DashboardClientModel } from '../models/dashboardClientModel';
export const dashboardClientService = {
  enrollClient: async (email: string, password: string, domain: string) => {
    const apiKey = crypto.randomBytes(32).toString('hex');
    const hashedApiKey = crypto.createHash('sha256').update(apiKey).digest('hex');
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
    const client = await DashboardClientModel.findOne({
      where: { email },
      attributes: ['hashedPassword', 'domain'],
    });
    if (!client) {
      throw new Error('로그인 에러');
    }
    const clientData: { hashedPassword: string; domain: string } = client.get({ plain: true });
    const isValidPassword = await bcrypt.compare(password, clientData.hashedPassword);
    if (!isValidPassword) {
      throw new Error('로그인 에러');
    }
    return clientData.domain;
  },
};
