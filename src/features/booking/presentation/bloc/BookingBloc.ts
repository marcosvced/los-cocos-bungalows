import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'
import type { UpdateDetailsEvent } from '@/features/booking/presentation/bloc/events/UpdateDetailsEvent'
import { BLoC } from '@/core/common/presentation/bloc/BLoC'
import { Booking } from '@/features/booking/domain/entities/Booking'
import { BookingState } from '@/features/booking/presentation/bloc/BookingState'
import { GetRoomsEvent } from '@/features/booking/presentation/bloc/events/GetRoomsEvent'

export class BookingBloc extends BLoC<BookingState, GetRoomsEvent | UpdateDetailsEvent> {
  constructor() {
    super(new BookingState({}))
  }

  async dispatch(event: GetRoomsEvent | UpdateDetailsEvent): Promise<void> {
    this.isLoading = true
    try {
      if (event instanceof GetRoomsEvent) {
        this.setRooms(await event.execute())
      }
      else {
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

  setDetails(details: BookingDetails): void {
    const data = new Booking({ ...this.state.data, details })
    this.state = new BookingState({ data })
  }
}
