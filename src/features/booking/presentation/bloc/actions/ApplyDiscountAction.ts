import type { Action } from '@/core/common/presentation/bloc/Action'
import type { Booking } from '@/features/booking/domain/entities/Booking'

export class ApplyDiscountAction implements Action<Pick<Booking, 'discount'>> {
  constructor(private readonly discount: number) {
  }

  execute(): Pick<Booking, 'discount'> {
    return { discount: this.discount }
  }
}
