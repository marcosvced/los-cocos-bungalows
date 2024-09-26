import type { Action } from '@/core/common/presentation/bloc/Action'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'

export class UpdatePaxAction implements Action<Pick<BookingDetails, 'pax'>> {
  constructor(
    private readonly adults: number,
    private readonly children?: number,
  ) {
  }

  execute(): Pick<BookingDetails, 'pax'> {
    return {
      pax: {
        adults: this.adults,
        children: this.children ?? 0,
      },
    }
  }
}
