import { bookingModel, Booking } from "./booking.domain";
import { bookingMapper } from "./booking.mapper";

class BookingRepository {
    public async create(doc: Booking) {
        return bookingModel.create(doc);
    }   
}

export const bookingRepository = new BookingRepository();