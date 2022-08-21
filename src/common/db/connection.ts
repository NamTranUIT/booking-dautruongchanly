import { NextFunction } from "express";
import mongoose from "mongoose";
import environment from "../../utils/environment";
import { logger } from "../logger/logger";

export class Db {
  private conn: mongoose.Mongoose;
  private readonly mongoUri: string = environment.MONGO_URI;

  public async connectToServer(): Promise<mongoose.Mongoose> {
    logger.debug("MongoURI: ", this.mongoUri);
    try {
      mongoose.set("debug", true);
      return mongoose.connect(String(this.mongoUri), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions);
    } catch (error) {
      logger.error(`Something went wrong with DB connection: ${error}`);
    }
  }

  public dbConnect() {
    return this.conn;
  }
}

export const db = new Db();
