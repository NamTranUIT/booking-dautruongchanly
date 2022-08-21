import { encrypt, getEncryptionConfig } from "../utils/crypto";
import environment from "../utils/environment";
import { User } from "./users.domain";
import { CreateUserRequest, IUserDetailResponse } from "./users.dto";

class UserMapper {
  public toUserCreationRequest(request: CreateUserRequest): User {
    return {
      ...request,
      password: encrypt(
        getEncryptionConfig(environment.SECRET_KEY),
        request.password
      ),
    };
  }

  public toUserResponse(user: User): IUserDetailResponse {
    return {
      id: `${user._id}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      username: user.username,
      password: user.password,
      roles: user.roles,
    };
  }
}

export const userMapper = new UserMapper();
