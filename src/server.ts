import cors from 'cors';
import express from 'express';
import { errorHandle } from './middleware/errorhandle';
import { dashBoardRouter } from './routes/dashBoardRoutes';
import { trackerSdkRouter } from './routes/trackerSdkRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(dashBoardRouter);
app.use(trackerSdkRouter);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
