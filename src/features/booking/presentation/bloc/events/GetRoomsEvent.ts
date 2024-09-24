import type { Event } from '@/core/common/presentation/bloc/Event'
import type { Room } from '@/core/room/domain/entities/Room'
import { RoomData } from '@/core/room/data/adapters/RoomData'
import { GetRoomsAction } from '@/features/booking/domain/actions/GetRoomsAction'

export class GetRoomsEvent implements Event<Room[]> {
  async execute(): Promise<Room[]> {
    const action = new GetRoomsAction(new RoomData())
    return await action.execute()
  }
}
