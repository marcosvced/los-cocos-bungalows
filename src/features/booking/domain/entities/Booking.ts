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
}
