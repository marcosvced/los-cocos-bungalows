import type { Repository } from '@/core/common/domain/ports/Repository'
import type { RoomDto } from '@/core/room/data/dto/RoomDto'
import type { Booking } from '@/features/booking/domain/entities/Booking'
import { BookingDto } from '@/features/booking/data/dto/BookingDto'
import { useMoney } from '@/lib/hooks/useMoney'

export class BookingData implements Repository<Booking> {
  static readonly storageKey = 'BOOKING_DATA'
  async save(booking: Booking): Promise<void> {
    const dto = {
      discount: booking.discount,
      pax: booking.pax,
      dates: {
        arrivalDate: booking.dates?.arrivalDate.toJSDate(),
        departureDate: booking.dates?.departureDate.toJSDate(),
      },
      room: {
        ...booking.room,
        amount: booking.room ? useMoney(booking.room.price) : '0',
      } as RoomDto,
    }
    localStorage.setItem(BookingData.storageKey, JSON.stringify(dto))
  }

  get(): Promise<Booking> {
    // Perhaps in the future it will be necessary to check if there
    // is data in local storage and if not, make a request rest
    const data: BookingDto = new BookingDto(JSON.parse(localStorage.getItem(BookingData.storageKey) ?? '{}'))
    return Promise.resolve(data.toDomain())
  }
}
