import type { Event } from '@/core/common/presentation/bloc/Event'
import type { BookingDates } from '@/features/booking/domain/entities/BookingDates'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'

export class UpdateDatesEvent implements Event<Pick<BookingDetails, 'dates'>> {
  constructor(private readonly arrival: string, private readonly departure: string) {
  }

  execute(): Pick<BookingDetails, 'dates'> {
    if (!this.arrival || !this.departure) {
      throw new Error('☠️ An entry date and an exit date must be added.')
    }

    if (this.departure < this.arrival) {
      throw new Error('☠️ The check-out date cannot be earlier than the check-in date.')
    }

    const dates: BookingDates = {
      arrivalDate: new Date(this.arrival),
      departureDate: new Date(this.departure),
    }
    return { dates }
  }
}
