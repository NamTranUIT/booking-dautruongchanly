import {
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from "class-validator";
import { ROLES } from "../utils/enums";

export class CreateUserRequest {
  @IsNotEmpty()
  public firstName: string;
  @IsNotEmpty()
  public lastName: string;
  @IsOptional()
  @IsEmail()
  public email?: string;
  @IsOptional()
  @IsPhoneNumber()
  public phone?: string;
  @IsNotEmpty()
  public username: string;
  @IsNotEmpty()
  public password: string;
  @ArrayNotEmpty()
  public roles: ROLES[];
}

export interface IUserDetailResponse {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  username: string;
  password: string;
  roles: ROLES[];
}
