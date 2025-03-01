import cors from 'cors';
import express from 'express';
import { userInfoRouter } from './routes/userInfoRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(userInfoRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
