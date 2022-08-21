import { User, userModel } from "./users.domain";

class UserRepository {
  public async createUser(req: User) {
    return userModel.create(req);
  }

  public async getUser(username: string) {
    return userModel.findOne({username}).lean();
  }
}

export const userRepository = new UserRepository();
