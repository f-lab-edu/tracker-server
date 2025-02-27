import express from 'express';
import { userDeviceController } from '../controllers/userDeviceController';

export const userDeviceRouter = express.Router();

userDeviceRouter.post('/userDevice', userDeviceController.saveUserDevice);
userDeviceRouter.get('/userDevice/browser/:domain', userDeviceController.getBrowserStats);
userDeviceRouter.get('/userDevice/os/:domain', userDeviceController.getOsStats);
userDeviceRouter.get('/userDevice/device/:domain', userDeviceController.getDeviceStats);
userDeviceRouter.get('/userDevice/resolution/:domain', userDeviceController.getResolutionStats);
