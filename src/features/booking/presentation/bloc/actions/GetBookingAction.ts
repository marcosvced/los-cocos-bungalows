import type { Action } from '@/core/common/presentation/bloc/Action'
import type { Booking } from '@/features/booking/domain/entities/Booking'
import { BookingData } from '@/features/booking/data/adapters/BookingData'
import { GetBookingQuery } from '@/features/booking/domain/queries/GetBookingQuery'

export class GetBookingAction implements Action<Booking> {
  async execute() {
    const query = new GetBookingQuery(new BookingData())
    return await query.execute()
  }
}
