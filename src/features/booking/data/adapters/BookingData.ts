import type { Repository } from '@/core/common/domain/ports/Repository'
import type { Booking } from '@/features/booking/domain/entities/Booking'
import { useStorage } from '@vueuse/core'

export class BookingData implements Repository<Booking> {
  private storageKey = 'BOOKING_DATA'
  save(booking: Booking): Promise<void> {
    useStorage(this.storageKey, booking)
  }

  get(): Promise<Booking> {
    // Perhaps in the future it will be necessary to check if there
    // is data in local storage and if not, make a request rest
    return useStorage(this.storageKey)
  }
}
