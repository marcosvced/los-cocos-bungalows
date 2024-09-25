import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingDates } from '@/features/booking/domain/entities/BookingDates'
import type { BookingPax } from '@/features/booking/domain/entities/BookingPax'

export interface BookingDetails {
  dates?: BookingDates
  pax?: BookingPax
  room?: Room
  amount?: number
}
