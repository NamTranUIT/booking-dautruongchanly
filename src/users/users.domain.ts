import { prop, getModelForClass } from "@typegoose/typegoose";
import * as mongoose from "mongoose";
import { ROLES } from "../utils/enums";

export class User {
  public _id?: mongoose.Types.ObjectId;
  @prop()
  public firstName: string;
  @prop()
  public lastName: string;
  @prop()
  public email?: string;
  @prop()
  public phone?: string;
  @prop()
  public username: string;
  @prop()
  public password: string;
  @prop()
  public roles: ROLES[];
}

export const userModel = getModelForClass(User, {
  existingMongoose: mongoose,
  schemaOptions: { collection: "users", timestamps: true, autoIndex: false },
});
