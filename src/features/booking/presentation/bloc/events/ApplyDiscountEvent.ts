import type { Event } from '@/core/common/presentation/bloc/Event'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'

export class ApplyDiscountEvent implements Event<Pick<BookingDetails, 'discount'>> {
  constructor(private readonly discount: number) {
  }

  execute(): Pick<BookingDetails, 'discount'> {
    return { discount: this.discount }
  }
}
