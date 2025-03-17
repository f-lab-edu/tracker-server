import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { errorHandle } from './middleware/errorHandle';
import { createSession } from './middleware/session';
import { dashboardRouter } from './routes/dashboardRoutes';
import { trackerSdkRouter } from './routes/trackerSdkRoutes';

const app = express();
const port = 3000;

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../localhost-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../localhost.pem')),
};

app.use(cors({ origin: 'https://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(createSession);
app.use('/dashboard', dashboardRouter);
app.use('/trackerSdk', trackerSdkRouter);
app.use(errorHandle);

https.createServer(options, app).listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
