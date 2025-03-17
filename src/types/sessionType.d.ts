import { Request } from 'express';
import { Session } from 'express-session';
import { ParsedQs } from 'qs';

export interface AuthenticatedRequest<ReqQuery = ParsedQs>
  extends Request<unknown, unknown, unknown, ReqQuery> {
  session: Session & {
    client: {
      email: string;
      domain: string;
      apiKey: string;
    };
  };
}
