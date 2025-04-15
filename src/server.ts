import dotenv from 'dotenv';
import express, { ErrorRequestHandler } from 'express';
import './config/dbConnection';
import { dashboardCors } from './middleware/dashboardCors';
import { errorHandle } from './middleware/errorHandle';
import { sdkCors } from './middleware/sdkCors';
import { dashboardRouter } from './routes/dashboardRoutes';
import { trackerSdkRouter } from './routes/trackerSdkRoutes';
import { userConnectionService } from './services/userConnectionService';

dotenv.config();
const app = express();
const port = 3000;
app.set('trust proxy', 1);
app.use(express.json());
app.use('/dashboard', dashboardCors, dashboardRouter);
app.use('/trackerSdk', sdkCors, trackerSdkRouter);
app.use(errorHandle as ErrorRequestHandler);

app.get('/', (req, res) => {
  res.send('tracker-server 서버 정상 작동 중!');
});

app.listen(port, () => {
  console.log(`🚀 서버 실행 중 👉 http://localhost:${port}`);
  setInterval(() => {
    userConnectionService.checkInactiveUsers();
    console.log('🫀 Heartbeat inactive check 실행됨');
  }, 30 * 1000);
});
