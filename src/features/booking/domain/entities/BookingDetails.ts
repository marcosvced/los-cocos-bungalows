import type { Room } from '@/core/room/domain/entities/Room'

export interface BookingDetails {
  room: Room
  amount: number
}
