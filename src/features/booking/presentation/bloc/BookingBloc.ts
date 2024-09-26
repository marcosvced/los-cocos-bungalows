import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'
import { BLoC } from '@/core/common/presentation/bloc/BLoC'
import { Booking } from '@/features/booking/domain/entities/Booking'
import { ApplyDiscountAction } from '@/features/booking/presentation/bloc/actions/ApplyDiscountAction'
import { GetRoomsAction } from '@/features/booking/presentation/bloc/actions/GetRoomsAction'
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
    actions.set(GetRoomsAction, async () => this.setRooms(await (<GetRoomsAction>action).execute() as Room[]))
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

  setRooms(rooms: Room[]) {
    const data = new Booking({ ...this.state.data, rooms })
    this.state = new BookingState({ data })
  }

  setDetails(payload: Partial<BookingDetails>): void {
    const details: BookingDetails = { ...this.state.data?.details, ...payload }
    const data = new Booking({ ...this.state.data, details })
    this.state = new BookingState({ data })
  }
}
