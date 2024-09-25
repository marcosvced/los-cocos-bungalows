import type { Price } from '@/core/common/domain/entities/price'
import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'

export interface BookingModel {
  rooms?: Room[]
  details?: BookingDetails
}
export class Booking implements BookingModel {
  rooms: Room[]
  details?: BookingDetails

  constructor({ rooms, details }: BookingModel) {
    this.rooms = rooms ?? []
    this.details = details
  }

  get amount(): Price {
    const roomAmount = this.details?.room?.price.amount ?? 0
    const amount = this.details?.discount ? roomAmount * (1 - this.details?.discount / 100) : roomAmount
    return { amount, currency: 'EUR' }
  }
}
