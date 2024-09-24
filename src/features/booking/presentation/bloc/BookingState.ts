import type { State } from '@/core/common/presentation/bloc/State'
import type { Booking } from '@/features/booking/domain/entities/Booking'

export class BookingState implements State<Booking> {
  data?: Booking
  errors: Error[]
  isLoading: boolean

  constructor({ errors, isLoading, data }: Partial<BookingState>) {
    this.data = data ?? undefined
    this.isLoading = isLoading ?? false
    this.errors = errors ?? []
  }
}
