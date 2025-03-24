import cors from 'cors';

export const sdkCors = cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],
  credentials: false,
});
