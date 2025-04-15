import { JwtPayload } from './jwtPayload';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
