import type { Event } from '@/core/common/presentation/bloc/Event'
import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'

export class UpdateRoomEvent implements Event<Pick<BookingDetails, 'room'>> {
  constructor(private readonly room: Room) {
  }

  execute(): Pick<BookingDetails, 'room'> {
    return { room: this.room }
  }
}
