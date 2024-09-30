import type { Exception } from '@/core/common/domain/exceptions/Exception'
import type { Room } from '@/core/room/domain/entities/Room'
import { BLoC } from '@/core/common/presentation/bloc/BLoC'
import { GetRoomsAction } from '@/core/room/presentation/bloc/actions/GetRoomsAction'
import { RoomState } from '@/core/room/presentation/bloc/RoomState'

export class RoomBloc extends BLoC<RoomState> {
  constructor() {
    super(new RoomState({}))
  }

  async dispatch(action: GetRoomsAction): Promise<void> {
    this.isLoading = true
    const actions = new Map([])
    actions.set(GetRoomsAction, async () => this.setRooms(await (<GetRoomsAction>action).execute() as Room[]))
    try {
      const fn: () => void = actions.get(action.constructor) as () => void
      fn && await fn()
    }
    catch (e) {
      this.isLoading = false
      this.error = e as Exception
    }
    finally {
      this.isLoading = false
    }
  }

  handelException(exception: Exception) {
    console.error(exception)
  }

  setRooms(rooms: Room[]) {
    const data = { ...this.state.data, list: rooms }
    this.state = new RoomState({ data })
  }
}
