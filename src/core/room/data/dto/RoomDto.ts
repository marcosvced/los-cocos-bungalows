import type { DTO } from '@/core/common/data/dtos/DTO'
import { Room } from '@/core/room/domain/entities/Room'

export class RoomDto implements DTO<Room> {
  amount: string
  beds: string
  description: string
  img: string
  name: string
  people: string
  size: string

  constructor(room?: any) {
    this.amount = room?.amount ?? ''
    this.beds = room?.beds ?? ''
    this.description = room?.description ?? ''
    this.img = room?.img ?? ''
    this.name = room?.name ?? ''
    this.people = room?.people ?? ''
    this.size = room?.size ?? ''
  }

  toDomain() {
    return new Room({
      amount: this.amount,
      beds: this.beds,
      description: this.description,
      img: this.img,
      name: this.name,
      people: this.people,
      size: this.size,
    })
  }
}
