import type { Event } from '@/core/common/presentation/bloc/Event'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'

export class UpdatePaxEvent implements Event<Pick<BookingDetails, 'pax'>> {
  constructor(private readonly adults: number, private readonly children?: number) {
  }

  execute(): Pick<BookingDetails, 'pax'> {
    return { pax: { adults: this.adults, children: this.children ?? 0 } }
  }
}
