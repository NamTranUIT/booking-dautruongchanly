import { UserToken, userTokenModel } from "./authorization.domain";

class AuthorizeRepository {
  public async createUserToken(doc: UserToken) {
    return userTokenModel.updateOne({ username: doc.username }, doc, {
      upsert: true,
    });
  }

  public async getUserToken(username: string, token: string) {
    return userTokenModel.findOne({ username, token });
  }

  public async removeUserToken(username: string, token: string) {
    return userTokenModel.remove({ username, token });
  }
}
export const authorizeRepository = new AuthorizeRepository();
