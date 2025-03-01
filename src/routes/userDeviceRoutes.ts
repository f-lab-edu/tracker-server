import express from 'express';
import { userDeviceController } from '../controllers/userDeviceController';

export const userDeviceRouter = express.Router();

userDeviceRouter.post('/domains/:domain/userDevice', userDeviceController.saveUserDevice);
userDeviceRouter.get(
  '/domains/:domain/userDevice/browsersStats',
  userDeviceController.getBrowserStats
);
userDeviceRouter.get('/domains/:domain/userDevice/osStats', userDeviceController.getOsStats);
userDeviceRouter.get(
  '/domains/:domain/userDevice/deviceStats',
  userDeviceController.getDeviceStats
);
userDeviceRouter.get(
  '/domains/:domain/userDevice/resolutionStats',
  userDeviceController.getResolutionStats
);
