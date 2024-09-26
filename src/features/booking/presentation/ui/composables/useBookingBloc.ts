import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingState } from '@/features/booking/presentation/bloc/BookingState'
import { ApplyDiscountAction } from '@/features/booking/presentation/bloc/actions/ApplyDiscountAction'
import { GetBookingAction } from '@/features/booking/presentation/bloc/actions/GetBookingAction'
import { SaveAction } from '@/features/booking/presentation/bloc/actions/SaveAction'
import { UpdateDatesAction } from '@/features/booking/presentation/bloc/actions/UpdateDatesAction'
import { UpdatePaxAction } from '@/features/booking/presentation/bloc/actions/UpdatePaxAction'
import { UpdateRoomAction } from '@/features/booking/presentation/bloc/actions/UpdateRoomAction'
import { BookingBloc } from '@/features/booking/presentation/bloc/BookingBloc'
import { useBLoC } from '@/lib/hooks/useBLoC'
import { onMounted, readonly } from 'vue'
import { useRoute } from 'vue-router'

export function useBookingBloc() {
  const route = useRoute()
  const { promo_code } = route.query

  const bloc = new BookingBloc()
  const state = useBLoC<BookingState>(bloc)

  onMounted(async () => {
    await bloc.dispatch(new GetBookingAction())
    if (Number.isInteger(Number.parseInt(promo_code as string))) {
      await bloc.dispatch(new ApplyDiscountAction(Number.parseInt(promo_code as string)))
    }
  })

  async function onRoomClickHandler(room: Room) {
    await bloc.dispatch(new UpdateRoomAction(room))
  }

  async function onSearchBoxChangeHandler(payload: any) {
    const { adults, children, arrivalDate, departureDate } = payload
    await bloc.dispatch(new UpdatePaxAction(adults, children))
    await bloc.dispatch(new UpdateDatesAction(arrivalDate, departureDate))
  }

  async function onSaveClickHandler() {
    await bloc.dispatch(new SaveAction())
  }

  return {
    onRoomClickHandler,
    onSearchBoxChangeHandler,
    onSaveClickHandler,
    state: readonly(state),
  }
}
