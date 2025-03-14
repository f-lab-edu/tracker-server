import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { errorHandle } from './middleware/errorHandle';
import { dashboardRouter } from './routes/dashboardRoutes';
import { trackerSdkRouter } from './routes/trackerSdkRoutes';
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/dashboard', dashboardRouter);
app.use('/trackerSdk', trackerSdkRouter);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
