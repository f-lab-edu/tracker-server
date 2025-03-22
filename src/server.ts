import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import './config/dbConnection';
import { errorHandle } from './middleware/errorHandle';
import { createSession } from './middleware/session';
import { dashboardRouter } from './routes/dashboardRoutes';
import { trackerSdkRouter } from './routes/trackerSdkRoutes';

const app = express();
const port = 3000;

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin);
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(createSession);
app.use('/dashboard', dashboardRouter);
app.use('/trackerSdk', trackerSdkRouter);
app.use(errorHandle);

app.get('/', (req, res) => {
  res.send('tracker-sdk 서버 정상 작동 중!');
});

app.listen(port, () => {
  console.log(`🚀 서버 실행 중 👉 http://localhost:${port}`);
});
