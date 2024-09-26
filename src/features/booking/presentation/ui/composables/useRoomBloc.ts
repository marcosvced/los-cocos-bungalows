import type { RoomState } from '@/core/room/presentation/bloc/RoomState'
import { GetRoomsAction } from '@/core/room/presentation/bloc/actions/GetRoomsAction'
import { RoomBloc } from '@/core/room/presentation/bloc/RoomBloc'
import { useBLoC } from '@/lib/hooks/useBLoC'
import { onMounted, readonly } from 'vue'

export function useRoomBloc() {
  const bloc = new RoomBloc()
  const state = useBLoC<RoomState>(bloc)

  onMounted(async () => {
    await bloc.dispatch(new GetRoomsAction())
  })

  return {
    state: readonly(state),
  }
}
