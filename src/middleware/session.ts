import session from 'express-session';

const isProduction = process.env.NODE_ENV === 'production';

export const createSession = session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: isProduction, httpOnly: true, sameSite: isProduction ? 'none' : 'lax' },
});
