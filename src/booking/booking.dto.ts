import { IsEnum, IsNotEmpty, IsOptional, ValidateIf, ValidateNested } from "class-validator";
import { ACCOUNT_TYPE, RANK_LEVEL } from "../utils/enums";
import { Type } from "class-transformer";

class OptionsRequest {
    @IsOptional()
    public isSchedule: boolean;
    @ValidateIf(object => object.isSchedule === true)
    @IsNotEmpty()
    public scheduleNote: string;
    @IsOptional()
    public liveWatching: boolean;
    @IsOptional()
    public boostUp: boolean;
    @IsOptional()
    public pickBooster: boolean;
    @ValidateIf(object => object.pickBooster === true)
    @IsNotEmpty()
    public boosterName: string;
}

export class CreateBookingRequest {
    @IsEnum(RANK_LEVEL)
    public currentRankLevel: RANK_LEVEL;
    @IsEnum(RANK_LEVEL)
    public expectRankLevel: RANK_LEVEL;
    @ValidateNested()
    @Type(() => OptionsRequest)
    public extendedOptions: OptionsRequest;
    @IsEnum(ACCOUNT_TYPE)
    public accountType: ACCOUNT_TYPE;
    @IsNotEmpty()
    public accountName: string;
    @IsNotEmpty()
    public password: string;
}

interface IOptionsResponse {
    isSchedule: boolean;
    scheduleNote: string;
    liveWatching: boolean;
    boostUp: boolean;
    pickBooster: boolean;
    boosterName: string;
}

export interface IBookingDetailResponse {
    id: string;
    currentRankLevel: RANK_LEVEL;
    expectRankLevel: RANK_LEVEL;
    extendedOptions: IOptionsResponse;
    accountType: ACCOUNT_TYPE;
    accountName: string;
    password: string;
}