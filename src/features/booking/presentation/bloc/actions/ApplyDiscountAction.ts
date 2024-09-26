import type { Action } from '@/core/common/presentation/bloc/Action'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'

export class ApplyDiscountAction implements Action<Pick<BookingDetails, 'discount'>> {
  constructor(private readonly discount: number) {
  }

  execute(): Pick<BookingDetails, 'discount'> {
    return { discount: this.discount }
  }
}
