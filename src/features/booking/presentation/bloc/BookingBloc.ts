import type { GetRoomsAction } from '@/core/room/presentation/bloc/actions/GetRoomsAction'
import { BLoC } from '@/core/common/presentation/bloc/BLoC'
import { Booking } from '@/features/booking/domain/entities/Booking'
import { ApplyDiscountAction } from '@/features/booking/presentation/bloc/actions/ApplyDiscountAction'
import { SaveAction } from '@/features/booking/presentation/bloc/actions/SaveAction'
import { UpdateDatesAction } from '@/features/booking/presentation/bloc/actions/UpdateDatesAction'
import { UpdatePaxAction } from '@/features/booking/presentation/bloc/actions/UpdatePaxAction'
import { UpdateRoomAction } from '@/features/booking/presentation/bloc/actions/UpdateRoomAction'
import { bookingInitialDataState, BookingState } from '@/features/booking/presentation/bloc/BookingState'

type Actions = GetRoomsAction | UpdateRoomAction | UpdatePaxAction | UpdateDatesAction | ApplyDiscountAction | SaveAction

export class BookingBloc extends BLoC<BookingState> {
  constructor() {
    super(new BookingState({ data: bookingInitialDataState }))
  }

  async dispatch(action: Actions): Promise<void> {
    this.isLoading = true

    const actions = new Map([])
    actions.set(UpdateRoomAction, () => this.setDetails((<UpdateRoomAction>action).execute()))
    actions.set(UpdatePaxAction, () => this.setDetails((<UpdatePaxAction>action).execute()))
    actions.set(UpdateDatesAction, () => this.setDetails((<UpdateDatesAction>action).execute()))
    actions.set(ApplyDiscountAction, () => this.setDetails((<ApplyDiscountAction>action).execute()))
    actions.set(SaveAction, () => (<SaveAction>action).execute(this.state.data))

    try {
      const fn: () => void = actions.get(action.constructor) as () => void
      fn && await fn()
    }
    catch (e) {
      this.isLoading = false
      this.error = e as Error
    }
    finally {
      this.isLoading = false
    }
  }

  setDetails(payload: Partial<Booking>): void {
    const data = new Booking({ ...this.state.data, ...payload })
    this.state = new BookingState({ data })
  }
}
