import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      // Allow custom fields like id or _id in the decoded JWT
      user?: string | (JwtPayload & { id?: string; _id?: string });
      token?: string;
    }
  }
}

export {};
