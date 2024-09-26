import type { Repository } from '@/core/common/domain/ports/Repository'
import type { Query } from '@/core/common/domain/useCases/Query'
import type { Booking } from '@/features/booking/domain/entities/Booking'

export class GetBookingQuery implements Query<Booking> {
  constructor(private readonly repository: Required<Pick<Repository<Booking>, 'get'>>) {
  }

  execute(): Promise<Booking> {
    return this.repository.get()
  }
}
