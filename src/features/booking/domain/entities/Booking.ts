import type { Price } from '@/core/common/domain/entities/price'
import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingDates } from '@/features/booking/domain/entities/BookingDates'
import type { BookingPax } from '@/features/booking/domain/entities/BookingPax'

export interface BookingModel {
  dates?: BookingDates
  pax?: BookingPax
  room?: Room
  discount?: number
}
export class Booking implements BookingModel {
  dates: BookingDates
  discount: number
  pax: BookingPax
  room: Room

  constructor({ pax, dates, room, discount }: BookingModel) {
    this.pax = pax
    this.dates = dates
    this.room = room
    this.discount = discount
  }

  get amount(): Price {
    const roomAmount = this.room?.price.amount ?? 0
    const amount = this.discount ? roomAmount * (1 - this.discount / 100) : roomAmount
    return { amount, currency: 'EUR' }
  }
}
