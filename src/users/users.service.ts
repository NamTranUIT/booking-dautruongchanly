import { CreateUserRequest } from "./users.dto";
import { userMapper } from "./users.mapper";
import { userRepository } from "./users.repository";

class UserService {
  public async createUser(req: CreateUserRequest) {
    const createdUser = await userRepository.createUser(userMapper.toUserCreationRequest(req));
    return userMapper.toUserResponse(createdUser);
  }

  public async getUser(username: string) {
    const user = await userRepository.getUser(username);
    return userMapper.toUserResponse(user);
  }
}

export const userService = new UserService();
