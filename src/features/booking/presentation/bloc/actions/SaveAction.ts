import type { Action } from '@/core/common/presentation/bloc/Action'
import type { Booking } from '@/features/booking/domain/entities/Booking'
import { useStorage } from '@vueuse/core'

export class SaveAction implements Action<void> {
  execute(data?: Booking) {
    if (!data) {
      throw new Error('No data to store.')
    }
    useStorage('BookingStorage', data)
  }
}
