import type { Event } from '@/core/common/presentation/bloc/Event'
import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'

export class UpdateDetailsEvent implements Event<BookingDetails> {
  constructor(private readonly room: Room) {
  }

  execute(): BookingDetails {
    return { room: this.room, amount: this.room.amount }
  }
}
