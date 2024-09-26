import type { Action } from '@/core/common/presentation/bloc/Action'
import type { BookingDates } from '@/features/booking/domain/entities/BookingDates'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'
import type { DateTime } from 'luxon'

export class UpdateDatesAction implements Action<Pick<BookingDetails, 'dates'>> {
  constructor(
    private readonly arrival: DateTime,
    private readonly departure: DateTime,
  ) {
  }

  execute(): Pick<BookingDetails, 'dates'> {
    if (!this.arrival || !this.departure) {
      throw new Error('☠️ An entry date and an exit date must be added.')
    }

    if (this.departure < this.arrival) {
      throw new Error('☠️ The check-out date cannot be earlier than the check-in date.')
    }

    const dates: BookingDates = {
      arrivalDate: this.arrival,
      departureDate: this.departure,
    }
    return { dates }
  }
}
