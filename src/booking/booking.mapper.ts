import { Booking } from "./booking.domain";
import { CreateBookingRequest, IBookingDetailResponse } from "./booking.dto";

class BookingMapper {
    public toBookingCreationRequest(request: CreateBookingRequest): Booking {
        return {
            ...request
        }
    }

    public toBookingResponse(booking: Booking): IBookingDetailResponse {
        return {
            id: `${booking._id}`,
            currentRankLevel: booking.currentRankLevel,
            expectRankLevel: booking.expectRankLevel,
            extendedOptions: booking.extendedOptions,
            accountType: booking.accountType,
            accountName: booking.accountName,
            password: booking.password
        }
    }
}

export const bookingMapper = new BookingMapper();