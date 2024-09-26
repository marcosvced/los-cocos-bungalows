import type { Action } from '@/core/common/presentation/bloc/Action'
import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'

export class UpdateRoomAction implements Action<Pick<BookingDetails, 'room'>> {
  constructor(private readonly room: Room) {
  }

  execute(): Pick<BookingDetails, 'room'> {
    return { room: this.room }
  }
}
