import { transformAndValidate } from "class-transformer-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { api } from "../common/decorators/api-response";
import { PermissionDeniedError } from "../common/errors/errors";
import { logger } from "../common/logger/logger";
import { ROLES } from "../utils/enums";
import { IJWTDataResponse, LoginRequest } from "./authorization.dto";
import { authorizeService } from "./authorization.service";

class AuthorizeHandler {
  @api(StatusCodes.OK)
  public async login(req: Request) {
    const request = (await transformAndValidate(
      LoginRequest,
      req.body as string
    )) as LoginRequest;
    const token = await authorizeService.generateJWT(request);
    return { token };
  }

  @api(StatusCodes.NO_CONTENT)
  public async logout(req: Request) {
    const token = req.headers.authorization.split("Bearer ")[1] || "";
    await authorizeService.revokeToken(token);
  }

  //middleware verify token
  public authorizer(...permittedRoles: ROLES[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization.split("Bearer ")[1] || "";
        const jwtData: IJWTDataResponse = await authorizeService.verifyToken(
          token
        );
        logger.debug("User info: ", jwtData);
        const isAllowed = authorizeHandler.checkPermission(
          permittedRoles,
          jwtData.roles
        );
        if (!isAllowed) {
          logger.error("User doesn't have permission to access the resource!");
          throw new PermissionDeniedError();
        }
        res.locals.jwtData = jwtData;
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  private checkPermission(
    permittedRoles: ROLES[],
    userRoles: ROLES[]
  ): boolean {
    let isAllowed = false;
    userRoles.forEach((role) => {
      if (permittedRoles.includes(role)) {
        isAllowed = true;
      }
    });
    return isAllowed;
  }
}

export const authorizeHandler = new AuthorizeHandler();
