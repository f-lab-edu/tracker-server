import express from 'express';
import { userDeviceController } from '../controllers/userDeviceController';

export const userDeviceRouter = express.Router();

userDeviceRouter.post('/userDevice', userDeviceController.createUserDevice);
userDeviceRouter.get('/userDevice', userDeviceController.getUserDevice);
