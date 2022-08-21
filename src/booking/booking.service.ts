import { CreateBookingRequest } from "./booking.dto";
import { bookingMapper } from "./booking.mapper";
import { bookingRepository } from "./booking.repository";

class BookingService {
    public async createBooking(request: CreateBookingRequest) {
        const createdBooking = await bookingRepository.create(bookingMapper.toBookingCreationRequest(request));
        return bookingMapper.toBookingResponse(createdBooking);
    }
}

export const bookingService = new BookingService();