import express from 'express';
import { userDeviceController } from '../controllers/userDeviceController';

export const userDeviceRouter = express.Router();

userDeviceRouter.post('/userDevices', userDeviceController.saveUserDevice);
userDeviceRouter.get('/userDevice/browsers-stats/:domain', userDeviceController.getBrowserStats);
userDeviceRouter.get('/userDevice/os-stats/:domain', userDeviceController.getOsStats);
userDeviceRouter.get('/userDevice/device-stats/:domain', userDeviceController.getDeviceStats);
userDeviceRouter.get(
  '/userDevice/resolution-stats/:domain',
  userDeviceController.getResolutionStats
);
