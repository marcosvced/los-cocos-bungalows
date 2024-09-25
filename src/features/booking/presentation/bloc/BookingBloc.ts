import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'
import { BLoC } from '@/core/common/presentation/bloc/BLoC'
import { Booking } from '@/features/booking/domain/entities/Booking'
import { bookingInitialDataState, BookingState } from '@/features/booking/presentation/bloc/BookingState'
import { GetRoomsEvent } from '@/features/booking/presentation/bloc/events/GetRoomsEvent'
import { UpdateDatesEvent } from '@/features/booking/presentation/bloc/events/UpdateDatesEvent'
import { UpdatePaxEvent } from '@/features/booking/presentation/bloc/events/UpdatePaxEvent'
import { UpdateRoomEvent } from '@/features/booking/presentation/bloc/events/UpdateRoomEvent'

export class BookingBloc extends BLoC<BookingState> {
  constructor() {
    super(new BookingState({ data: bookingInitialDataState }))
  }

  async dispatch(event: GetRoomsEvent | UpdateRoomEvent | UpdatePaxEvent | UpdateDatesEvent): Promise<void> {
    this.isLoading = true
    try {
      if (event instanceof GetRoomsEvent) {
        this.setRooms(await event.execute())
      }
      else if (
        event instanceof UpdateRoomEvent
        || event instanceof UpdatePaxEvent
        || event instanceof UpdateDatesEvent
      ) {
        this.setDetails(event.execute())
      }
    }
    catch (e) {
      this.isLoading = false
      this.error = e as Error
    }
  }

  setRooms(rooms: Room[]) {
    const data = new Booking({ ...this.state.data, rooms })
    this.state = new BookingState({ data })
  }

  setDetails(payload: Pick<BookingDetails, 'room' | 'amount' | 'pax' | 'dates'>): void {
    const details: BookingDetails = { ...this.state.data?.details, ...payload }
    const data = new Booking({ ...this.state.data, details })
    this.state = new BookingState({ data })
  }
}
