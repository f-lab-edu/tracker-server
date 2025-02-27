import cors from 'cors';
import express from 'express';
import { heartbeatRouter } from './routes/heartbeatRoutes';
import { userInfoRouter } from './routes/userInfoRoutes';
import { userPageInfoRouter } from './routes/userPageInfoRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(userInfoRouter);
app.use(heartbeatRouter);
app.use(userPageInfoRouter);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
