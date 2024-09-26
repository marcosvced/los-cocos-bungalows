import type { DTO } from '@/core/common/data/dtos/DTO'
import { RoomDto } from '@/core/room/data/dto/RoomDto'
import { Booking } from '@/features/booking/domain/entities/Booking'
import { useDate } from '@/lib/hooks/useDate'

export class BookingDto implements DTO<Booking> {
  dates?: { arrivalDate: Date, departureDate: Date }
  pax?: { adults: number, children?: number }
  room?: RoomDto
  discount?: number

  constructor(dto?: BookingDto) {
    this.dates = dto?.dates
    this.pax = dto?.pax
    this.room = new RoomDto(dto?.room ?? {})
    this.discount = dto?.discount
  }

  toDomain() {
    return new Booking({
      room: this.room?.toDomain(),
      pax: this.pax
        ? {
            adults: this.pax.adults ? Number.parseInt(`${this.pax?.adults}`) : 0,
            children: this.pax.children ? Number.parseInt(`${this.pax?.children}`) : undefined,
          }
        : undefined,
      dates: this.dates
        ? {
            arrivalDate: this.dates.arrivalDate ? useDate(new Date(this.dates?.arrivalDate)) : useDate('today'),
            departureDate: this.dates.departureDate ? useDate(new Date(this.dates?.departureDate)) : useDate('tomorrow'),
          }
        : undefined,
      discount: this.discount ? Number.parseInt(`${this.discount}`) : undefined,
    })
  }
}
