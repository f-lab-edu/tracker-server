import cors from 'cors';

export const dashboardCors = cors({
  origin: 'https://tracker-dashboard.site',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
