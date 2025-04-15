import bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { DashboardClientModel } from '../models/dashboardClientModel';

export const dashboardClientService = {
  enrollClient: async (email: string, password: string, domain: string) => {
    const isExistingUser = await DashboardClientModel.findOne({
      where: {
        [Op.or]: [{ email }, { domain }],
      },
      attributes: ['id'],
    });
    if (isExistingUser) {
      throw new Error('회원가입 에러');
    }
    const apiKey = crypto.randomBytes(32).toString('hex');
    const hashedPassword = await bcrypt.hash(password, 10);
    await DashboardClientModel.create({
      email,
      hashedPassword,
      domain,
      apiKey,
    });
    return apiKey;
  },

  loginClient: async (email: string, password: string) => {
    const client = await DashboardClientModel.findOne({
      where: { email },
      attributes: ['email', 'hashedPassword', 'domain', 'apiKey'],
    });
    if (!client) {
      throw new Error('로그인 에러');
    }
    const clientData = client.get({ plain: true }) as {
      email: string;
      hashedPassword: string;
      domain: string;
      apiKey: string;
    };
    const isValidPassword = await bcrypt.compare(password, clientData.hashedPassword);
    if (!isValidPassword) {
      throw new Error('로그인 에러');
    }
    const token = jwt.sign(
      { email: clientData.email, domain: clientData.domain },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    return {
      token,
      client: {
        email: clientData.email,
        domain: clientData.domain,
        apiKey: clientData.apiKey,
      },
    };
  },
};
