import { transformAndValidate } from "class-transformer-validator";
import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { api } from "../common/decorators/api-response";
import { errors } from "../common/errors/error-definition";
import { errorHandler } from "../common/errors/error-handler";
import { logger } from "../common/logger/logger";
import { CreateUserRequest } from "./users.dto";
import { userService } from "./users.service";

errorHandler.load(errors);

class UserHandler {
  @api(StatusCodes.CREATED)
  public async createUser(req: Request) {
    const request = (await transformAndValidate(
      CreateUserRequest,
      req.body as string
    )) as CreateUserRequest;
    logger.info("Start create user");
    return userService.createUser(request);
  }

  @api(StatusCodes.OK)
  public async getUserDetail(req: Request) {
    return userService.getUser(req.params.username);
  }
}

export const userHandler = new UserHandler();
