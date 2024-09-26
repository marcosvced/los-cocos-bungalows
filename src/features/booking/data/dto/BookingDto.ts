import type { DTO } from '@/core/common/data/dtos/DTO'
import type { Room } from '@/core/room/domain/entities/Room'
import type { Booking } from '@/features/booking/domain/entities/Booking'
import type { BookingDates } from '@/features/booking/domain/entities/BookingDates'
import type { BookingPax } from '@/features/booking/domain/entities/BookingPax'

export class BookingDto implements DTO<Booking> {
  dates?: BookingDates
  pax?: BookingPax
  room?: Room
  discount?: number
}
