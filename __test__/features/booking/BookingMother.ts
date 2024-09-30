import type { Booking } from '@/features/booking/domain/entities/Booking'
import type { BookingDates } from '@/features/booking/domain/entities/BookingDates'
import { useDate } from '@/lib/hooks/useDate'
import { Mother } from '../../common/Mother'
import { BookingFactory } from './BookingFactory'

export class BookingMother extends Mother<Booking> {
  valid(): Booking {
    return BookingFactory.new().create()
  }

  invalid(): Booking {
    const invalidDates: BookingDates = {
      arrivalDate: useDate('tomorrow'),
      departureDate: useDate('today'),
    }
    return BookingFactory.new().create({ dates: invalidDates })
  }
}
