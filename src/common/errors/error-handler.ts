import { ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UNKNOWN_ERROR } from "../../utils/constant";
import { IErrorMessage, IResponseFailure } from "./interface";

class ErrorHandler {
  private generalErrors = new Map();
  public async handleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let errors: Error[];
    let message = "";
    if (Array.isArray(err)) {
      errors = err;
      message = errorHandler.extractValidationErrorMessage(err).slice(0, -2);
    } else {
      errors = [err];
      message = err.message;
    }
    const errorResponse = errorHandler.resolve(errors, message);
    const errMessage: IErrorMessage = {
      code: errorResponse.code,
      message: errorResponse.message,
    };
    switch (errorResponse.httpStatusCode) {
      case StatusCodes.NOT_FOUND:
        return res.status(StatusCodes.NOT_FOUND).send(errMessage);
      case StatusCodes.BAD_REQUEST:
        return res.status(StatusCodes.BAD_REQUEST).send(errMessage);
      case StatusCodes.UNAUTHORIZED:
        return res.status(StatusCodes.UNAUTHORIZED).send(errMessage);
      case StatusCodes.FORBIDDEN:
        return res.status(StatusCodes.FORBIDDEN).send(errMessage);
      default:
        return res.status(StatusCodes.BAD_GATEWAY).send(errMessage);
    }
  }

  public load(errors: Map<string, any>) {
    for (const key of errors.keys()) {
      this.generalErrors.set(key, errors.get(key));
    }
  }

  public resolve(_errors: Error[], message?: string): IResponseFailure {
    const errorName = _errors[0].constructor.name;
    if (this.generalErrors.has(errorName)) {
      const err = this.generalErrors.get(errorName);
      if (message) {
        err.message = message;
      }
      return err;
    }
    return this.generalErrors.get(UNKNOWN_ERROR);
  }

  private extractValidationErrorMessage(errorList: ValidationError[]): string {
    let message = "";
    errorList.forEach((error) => {
      if (error.constraints && Object.keys(error.constraints).length > 0) {
        Object.keys(error.constraints).forEach((validator) => {
          message += `Property: ${error.property} - ${error.constraints?.[validator]}; `;
        });
      }
      // validate nested array or object
      if (error.children && error.children.length) {
        message += errorHandler.extractValidationErrorMessage(error.children);
      }
    });
    return message;
  }
}

export const errorHandler = new ErrorHandler();
