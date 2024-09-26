import type { Action } from '@/core/common/presentation/bloc/Action'
import type { Booking } from '@/features/booking/domain/entities/Booking'

export class UpdatePaxAction implements Action<Pick<Booking, 'pax'>> {
  constructor(
    private readonly adults: number,
    private readonly children?: number,
  ) {
  }

  execute(): Pick<Booking, 'pax'> {
    return {
      pax: {
        adults: this.adults,
        children: this.children ?? 0,
      },
    }
  }
}
