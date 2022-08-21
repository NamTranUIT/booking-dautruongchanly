import { getModelForClass, prop } from "@typegoose/typegoose";
import * as mongoose from "mongoose";
import { ACCOUNT_TYPE, RANK_LEVEL } from "../utils/enums";

class Options {
    @prop({default: false})
    public isSchedule: boolean;
    @prop()
    public scheduleNote: string;
    @prop({defalt: false})
    public liveWatching: boolean;
    @prop({default: false})
    public boostUp: boolean;
    @prop({default: false})
    public pickBooster: boolean;
    @prop()
    public boosterName: string;
}

export class Booking {
    public _id?: mongoose.Types.ObjectId;
    @prop({required: true})
    public currentRankLevel: RANK_LEVEL;
    @prop({required: true})
    public expectRankLevel: RANK_LEVEL;
    @prop({_id: false})
    public extendedOptions: Options;
    @prop()
    public accountType: ACCOUNT_TYPE;
    @prop()
    public accountName: string;
    @prop()
    public password: string;
}

export const bookingModel = getModelForClass(Booking, {
    existingMongoose: mongoose,
    schemaOptions: { collection: "bookings", timestamps: true, autoIndex: false },
  });
  