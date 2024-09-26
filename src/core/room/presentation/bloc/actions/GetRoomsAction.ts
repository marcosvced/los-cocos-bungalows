import type { Action } from '@/core/common/presentation/bloc/Action'
import type { Room } from '@/core/room/domain/entities/Room'
import { RoomData } from '@/core/room/data/adapters/RoomData'
import { GetRoomsQuery } from '@/core/room/domain/queries/GetRoomsQuery'

export class GetRoomsAction implements Action<Room[]> {
  async execute(): Promise<Room[]> {
    console.log('aka')
    const action = new GetRoomsQuery(new RoomData())
    return await action.execute()
  }
}
