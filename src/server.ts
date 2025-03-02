import cors from 'cors';
import express from 'express';
import { UUIDV4 } from 'sequelize';
import { errorHandle } from './middleware/errorhandle';
import { dashBoardRouter } from './routes/dashBoardRoutes';
import { trackerSdkRouter } from './routes/trackerSdkRoutes';
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.post('/UserCookieId', (req, res) => {
  let userId = req.cookies.userId || req.body.userId;
  if (!userId) {
    userId = UUIDV4();
  }
  res.setHeader('Set-Cookie', `userId=${userId}; Path=/; Max-Age=604800; SameSite=None; Secure`);
  res.json({ userId });
});
app.use(dashBoardRouter);
app.use(trackerSdkRouter);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
