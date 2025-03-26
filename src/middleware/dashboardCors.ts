import cors from 'cors';

export const dashboardCors = cors({
  origin: ['https://tracker-dashboard.site', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
