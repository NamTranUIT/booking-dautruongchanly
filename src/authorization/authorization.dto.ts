import { IsNotEmpty } from "class-validator";
import { ROLES } from "../utils/enums";

export class LoginRequest {
  @IsNotEmpty()
  public username: string;
  @IsNotEmpty()
  public password: string;
}

export interface UserJWTPayload {
  username: string;
  roles: ROLES[];
}

export interface IJWTDataResponse {
  username: string;
  roles: ROLES[];
  iat: number;
  exp: number;
}
