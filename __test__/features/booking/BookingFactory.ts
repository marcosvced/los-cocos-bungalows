import { Booking } from '@/features/booking/domain/entities/Booking'
import { useDate } from '@/lib/hooks/useDate'
import { Factory } from '../../common/Factory'
import { RoomFactory } from '../../core/room/RoomFactory'

export class BookingFactory extends Factory<Booking> {
  protected fake(): Booking {
    const baseDate = this.faker.date.anytime()
    return new Booking({
      discount: this.faker.number.int({ min: 0, max: 100 }),
      room: RoomFactory.new().create(),
      pax: {
        children: this.faker.number.int({ min: 0, max: 6 }),
        adults: this.faker.number.int({ min: 1, max: 5 }),
      },
      dates: {
        departureDate: useDate(baseDate),
        arrivalDate: useDate(baseDate, { plus: this.faker.number.int() }),
      },
    })
  }
}
