import { bookingModel, Booking } from "./booking.domain";
class BookingRepository {
  public async create(doc: Booking) {
    return bookingModel.create(doc);
  }
}

export const bookingRepository = new BookingRepository();
