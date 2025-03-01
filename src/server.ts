import cors from 'cors';
import express from 'express';

import { errorHandle } from './middleware/errorhandle';
import { heartbeatRouter } from './routes/heartbeatRoutes';
import { userDeviceRouter } from './routes/userDeviceRoutes';
import { userInfoRouter } from './routes/userInfoRoutes';
import { userPageInfoRouter } from './routes/userPageInfoRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(userInfoRouter);
app.use(heartbeatRouter);
app.use(userPageInfoRouter);
app.use(userDeviceRouter);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
