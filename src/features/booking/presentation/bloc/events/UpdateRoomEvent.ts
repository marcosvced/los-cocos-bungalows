import type { Event } from '@/core/common/presentation/bloc/Event'
import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'

export class UpdateRoomEvent implements Event<Pick<BookingDetails, 'room' | 'amount'>> {
  constructor(private readonly room: Room) {
  }

  execute(): Pick<BookingDetails, 'room' | 'amount'> {
    return { room: this.room, amount: this.room.amount }
  }
}
