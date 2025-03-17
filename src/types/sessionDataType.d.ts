import 'express-session';

declare module 'express-session' {
  interface SessionData {
    client?: {
      email: string;
      domain: string;
      apiKey: string;
    };
  }
}
