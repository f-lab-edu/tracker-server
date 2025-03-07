import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { UUIDV4 } from 'sequelize';
import { errorHandle } from './middleware/errorHandle';
import { dashboardRouter } from './routes/dashboardRoutes';
import { trackerSdkRouter } from './routes/trackerSdkRoutes';

const app = express();
const port = 3000;

app.use(
  cors({
    origin: 'http://client-tracker-sdk',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.get('/userCookieId', (req, res) => {
  let userId = req.body.userId;
  if (!userId) {
    userId = UUIDV4();
  }
  res.setHeader(
    'Set-Cookie',
    `userId=${userId}; Max-Age=999999999 Path=/; SameSite=None; Secure; HttpOnly`
  );
  res.send({ success: true });
});
app.use(dashboardRouter);
app.use(trackerSdkRouter);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
