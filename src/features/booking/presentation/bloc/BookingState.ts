import type { Exception } from '@/core/common/domain/exceptions/Exception'
import type { State } from '@/core/common/presentation/bloc/State'
import { Booking } from '@/features/booking/domain/entities/Booking'
import { useDate } from '@/lib/hooks/useDate'

export const bookingInitialDataState = new Booking({
  pax: {
    adults: 2,
  },
  dates: {
    arrivalDate: useDate('today'),
    departureDate: useDate('tomorrow'),
  },
})

export class BookingState implements State<Booking> {
  data?: Booking
  errors: Exception[]
  isLoading: boolean

  constructor({ errors, isLoading, data }: Partial<BookingState>) {
    this.data = data ?? undefined
    this.isLoading = isLoading ?? false
    this.errors = errors ?? []
  }
}
