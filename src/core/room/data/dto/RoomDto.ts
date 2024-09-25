import type { DTO } from '@/core/common/data/dtos/DTO'
import type { Price } from '@/core/common/domain/entities/price'
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
      price: this._parseAmount(this.amount),
      beds: this.beds,
      description: this.description,
      img: this.img,
      name: this.name,
      people: this.people,
      size: this.size,
    })
  }

  private _parseAmount(amount: number) {
    const numberPattern = /[\d,.]+/g
    const total = Number.parseFloat(amount.match(numberPattern)[0].replace(',', '.'))
    const currency = 'EUR'
    return { amount: total, currency } as Price
  }
}
