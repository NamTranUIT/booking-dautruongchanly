import { logger } from "../common/logger/logger";
import * as jwt from "jsonwebtoken";
import { UserJWTPayload } from "../authorization/authorization.dto";

class JwtUtil {
  public sign(
    payload: UserJWTPayload,
    jwtSecret: string,
    option?: object
  ): string {
    return jwt.sign(payload, jwtSecret, { ...option });
  }

  public verify(token: string, jwtSecret: string): object | string {
    try {
      return jwt.verify(token, jwtSecret);
    } catch (err) {
      logger.error(`Verify token has error: `, err);
      throw new Error(err);
    }
  }
}

export const jwtUtil = new JwtUtil();
