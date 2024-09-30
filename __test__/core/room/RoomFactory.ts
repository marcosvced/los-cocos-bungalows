import { Room } from '@/core/room/domain/entities/Room'
import { Factory } from '../../common/Factory'
import { PriceFactory } from '../common/PriceFactory'

export class RoomFactory extends Factory<Room> {
  protected fake(): Room {
    return new Room({
      id: this.faker.string.uuid(),
      beds: this.faker.number.int({ min: 1, max: 10 }),
      name: this.faker.lorem.words(),
      description: this.faker.lorem.paragraph(),
      people: this.faker.number.int({ min: 1, max: 10 }),
      size: this.faker.number.int({ min: 5, max: 500 }),
      price: PriceFactory.new().create(),
      img: this.faker.image.url({ height: 300, width: 400 }),
    })
  }
}
