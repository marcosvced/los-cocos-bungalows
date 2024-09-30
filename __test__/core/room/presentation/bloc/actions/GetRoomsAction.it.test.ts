import { Room } from '@/core/room/domain/entities/Room'
import { GetRoomsAction } from '@/core/room/presentation/bloc/actions/GetRoomsAction'
import { describe, it } from 'vitest'

describe('get Rooms Action', () => {
  // execute method returns a list of Room objects
  it('should return a list of Room objects when execute is called', async () => {
    const action = new GetRoomsAction()
    const result = await action.execute()

    result.forEach(data => expect(data).toBeInstanceOf(Room))
  })
})
