import { getModelForClass, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

export class UserToken {
    public _id?: mongoose.Types.ObjectId;
    @prop()
    public username: string;
    @prop()
    public token: string;
}

export const userTokenModel = getModelForClass(UserToken, {
    existingMongoose: mongoose,
    schemaOptions: { collection: "user_tokens", timestamps: true, autoIndex: false },
  });
  