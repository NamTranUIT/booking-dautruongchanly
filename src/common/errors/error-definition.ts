import { StatusCodes } from "http-status-codes";
import { UNKNOWN_ERROR, VALIDATION_ERROR } from "../../utils/constant";
import {
  InvalidUsernameOrPassword,
  ObjectNotFound,
  PermissionDeniedError,
} from "./errors";

export const errors = new Map();

errors.set(UNKNOWN_ERROR, {
  code: 5000,
  message: "Unknown error",
  httpStatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
});

errors.set(VALIDATION_ERROR, {
  code: 5001,
  message: "Data validation error",
  httpStatusCode: StatusCodes.BAD_REQUEST,
});

errors.set(ObjectNotFound.name, {
  code: 4040,
  message: "Object not found",
  httpStatusCode: StatusCodes.NOT_FOUND,
});

errors.set(PermissionDeniedError.name, {
  code: 5002,
  message: "Permission Denied",
  httpStatusCode: StatusCodes.BAD_REQUEST,
});

errors.set(InvalidUsernameOrPassword.name, {
  code: "1000",
  message: "Invalid username or password",
  httpStatusCode: StatusCodes.UNAUTHORIZED,
});
