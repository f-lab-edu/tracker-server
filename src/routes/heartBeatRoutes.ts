import express from 'express';
import { heartBeatController } from '../controllers/heartBeatController';

export const hearBeatRouter = express.Router();

hearBeatRouter.post('/heartBeat', heartBeatController.sendStatus);
