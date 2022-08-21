import {
  InvalidUsernameOrPassword,
  PermissionDeniedError,
} from "../common/errors/errors";
import { logger } from "../common/logger/logger";
import { userService } from "../users/users.service";
import { decrypt, getEncryptionConfig } from "../utils/crypto";
import environment from "../utils/environment";
import { jwtUtil } from "../utils/jwt";
import { IJWTDataResponse, LoginRequest } from "./authorization.dto";
import { authorizeRepository } from "./authorization.repository";

class AuthorizeService {
  public async generateJWT(request: LoginRequest) {
    const user = await userService.getUser(request.username);
    if (!user) {
      logger.error("User not found!");
      throw new InvalidUsernameOrPassword();
    }
    let token = "";
    if (
      decrypt(getEncryptionConfig(environment.SECRET_KEY), user.password) ===
      request.password
    ) {
      token = jwtUtil.sign(
        { username: user.username, roles: user.roles },
        environment.JWT_SECRET,
        {
          algorithm: "HS256",
          expiresIn: environment.JWT_EXPIRES_IN,
        }
      );
    }
    if (!token) {
      logger.error("Password has not matched!");
      throw new InvalidUsernameOrPassword();
    }
    await authorizeRepository.createUserToken({
      username: user.username,
      token,
    });
    return token;
  }

  public async verifyToken(token: string): Promise<IJWTDataResponse> {
    if (!token) {
      logger.error("Token not found!");
      throw new PermissionDeniedError();
    }
    const jwtData = jwtUtil.verify(
      token,
      environment.JWT_SECRET
    ) as IJWTDataResponse;
    const userToken = await authorizeRepository.getUserToken(
      jwtData.username,
      token
    );
    if (!userToken) {
      throw new PermissionDeniedError();
    }
    return jwtData;
  }

  public async revokeToken(token: string) {
    if (!token) {
      logger.error("Token not found!");
      return;
    }
    const jwtData = jwtUtil.verify(
      token,
      environment.JWT_SECRET
    ) as IJWTDataResponse;
    await authorizeRepository.removeUserToken(jwtData.username, token);
    logger.info("Logout success for username: ", jwtData.username);
  }
}

export const authorizeService = new AuthorizeService();
