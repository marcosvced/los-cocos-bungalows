import type { Action } from '@/core/common/presentation/bloc/Action'
import type { Room } from '@/core/room/domain/entities/Room'
import type { Booking } from '@/features/booking/domain/entities/Booking'

export class UpdateRoomAction implements Action<Pick<Booking, 'room'>> {
  constructor(private readonly room: Room) {
  }

  execute(): Pick<Booking, 'room'> {
    return { room: this.room }
  }
}
