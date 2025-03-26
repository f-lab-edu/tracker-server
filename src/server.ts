import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import './config/dbConnection';
import { dashboardCors } from './middleware/dashboardCors';
import { errorHandle } from './middleware/errorHandle';
import { sdkCors } from './middleware/sdkCors';
import { createSession } from './middleware/session';
import { dashboardRouter } from './routes/dashboardRoutes';
import { trackerSdkRouter } from './routes/trackerSdkRoutes';

dotenv.config();
const app = express();
const port = 3000;
app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());
app.use('/dashboard', dashboardCors, createSession, dashboardRouter);
app.use('/trackerSdk', sdkCors, trackerSdkRouter);
app.use(errorHandle);

app.get('/', (req, res) => {
  res.send('tracker-sdk 서버 정상 작동 중!');
});

app.listen(port, () => {
  console.log(`🚀 서버 실행 중 👉 http://localhost:${port}`);
});
