import bcrypt from 'bcryptjs';
import { v4 as UUIDV4 } from 'uuid';
import { DashboardClientModel } from '../models/dashboardClientModel';

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
};
