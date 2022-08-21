import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../logger/logger";

export function api(statusCode?: StatusCodes) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (
      request: Request,
      response: Response,
      next: NextFunction
    ) {
      logger.debug("Headers:", request.headers);
      logger.debug("Query: ", request.query);
      logger.debug("Params: ", request.params);
      logger.debug("Body: ", request.body);
      try {
        const result = await originalMethod.apply(this, arguments);
        logger.debug("response:  ", result);
        response.status(statusCode || StatusCodes.OK).send(result);
      } catch (error) {
        logger.error("Unexpected error occurred: ", error);
        next(error);
      }
    };
    return descriptor;
  };
}
