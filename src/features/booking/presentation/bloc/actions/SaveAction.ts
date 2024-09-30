import type { Action } from '@/core/common/presentation/bloc/Action'
import type { Booking } from '@/features/booking/domain/entities/Booking'
import { EmptyException } from '@/core/common/domain/exceptions/GenericException'
import { BookingData } from '@/features/booking/data/adapters/BookingData'
import { SaveCommand } from '@/features/booking/domain/commands/SaveCommand'

export class SaveAction implements Action<void> {
  async execute(data?: Booking) {
    if (!data) {
      EmptyException.throw('No data to store.')
    }

    const useCase = new SaveCommand(new BookingData())
    await useCase.execute(data)
  }
}
