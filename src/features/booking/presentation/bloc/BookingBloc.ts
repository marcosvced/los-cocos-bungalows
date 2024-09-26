import type { GetRoomsAction } from '@/core/room/presentation/bloc/actions/GetRoomsAction'
import { BLoC } from '@/core/common/presentation/bloc/BLoC'
import { Booking } from '@/features/booking/domain/entities/Booking'
import { ApplyDiscountAction } from '@/features/booking/presentation/bloc/actions/ApplyDiscountAction'
import { GetBookingAction } from '@/features/booking/presentation/bloc/actions/GetBookingAction'
import { SaveAction } from '@/features/booking/presentation/bloc/actions/SaveAction'
import { UpdateDatesAction } from '@/features/booking/presentation/bloc/actions/UpdateDatesAction'
import { UpdatePaxAction } from '@/features/booking/presentation/bloc/actions/UpdatePaxAction'
import { UpdateRoomAction } from '@/features/booking/presentation/bloc/actions/UpdateRoomAction'
import { bookingInitialDataState, BookingState } from '@/features/booking/presentation/bloc/BookingState'

type Actions =
  GetRoomsAction
  | UpdateRoomAction
  | UpdatePaxAction
  | UpdateDatesAction
  | ApplyDiscountAction
  | SaveAction
  | GetBookingAction

export class BookingBloc extends BLoC<BookingState> {
  private actions: Map<unknown, (action: any) => void> = new Map([])

  constructor() {
    super(new BookingState({ data: bookingInitialDataState }))

    this.actions.set(UpdateRoomAction, async (action: UpdateRoomAction) => this.setDetails(await action.execute()))
    this.actions.set(UpdatePaxAction, async (action: UpdatePaxAction) => this.setDetails(await action.execute()))
    this.actions.set(UpdateDatesAction, async (action: UpdateDatesAction) => this.setDetails(await action.execute()))
    this.actions.set(ApplyDiscountAction, async (action: ApplyDiscountAction) => this.setDetails(await action.execute()))
    this.actions.set(GetBookingAction, async (action: GetBookingAction) => this.setDetails(await action.execute()))
    this.actions.set(SaveAction, (action: SaveAction) => action.execute(this.state.data))
  }

  async dispatch(action: Actions): Promise<void> {
    try {
      this.isLoading = true
      const fn: undefined | ((action: any) => void) = this.actions.get(action.constructor)
      fn && await fn(action)
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
