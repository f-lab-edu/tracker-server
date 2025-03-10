import session from 'express-session';

export function createSession() {
  return session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  });
}
