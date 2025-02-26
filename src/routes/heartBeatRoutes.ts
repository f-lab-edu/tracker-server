import express from 'express';
import { heartbeatController } from '../controllers/heartbeatController';

export const heartbeatRouter = express.Router();

heartbeatRouter.post('/heartbeat', heartbeatController.handleHeartbeat);
heartbeatRouter.get('/onlineUsersCount', heartbeatController.getOnlineUsersCount);
