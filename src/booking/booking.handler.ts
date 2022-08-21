import { Request } from "express";
import { StatusCodes } from "http-status-codes";
import { api } from "../common/decorators/api-response";
import { errors } from "../common/errors/error-definition";
import { errorHandler } from "../common/errors/error-handler";
import { bookingService } from "./booking.service";
import { transformAndValidate } from "class-transformer-validator";
import { CreateBookingRequest } from "./booking.dto";
import { logger } from "../common/logger/logger";


errorHandler.load(errors)

class BookingHandler {
    @api(StatusCodes.CREATED)
    public async createBooking(req: Request) {
        const request = (await transformAndValidate(
            CreateBookingRequest,
            req.body as string
          )) as CreateBookingRequest;
          logger.info("Start create booking")
        return bookingService.createBooking(request);
    }
}

export const bookingHandler = new BookingHandler();