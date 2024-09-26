import type { Repository } from '@/core/common/domain/ports/Repository'
import type { Command } from '@/core/common/domain/useCases/Command'
import type { BookingModel } from '@/features/booking/domain/entities/Booking'

export class SaveCommand implements Command {
  constructor(private readonly repository: Required<Pick<Repository, 'save'>>) {
  }

  async execute(booking: BookingModel): Promise<void> {
    await this.repository.save(booking)
  }
}
