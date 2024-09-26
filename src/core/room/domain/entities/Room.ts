import type { Price } from '@/core/common/domain/entities/price'

export interface RoomModel {
  id: string
  name?: string
  description?: string
  size?: string
  beds?: string
  people?: string
  price?: Price
  img?: string
}

export class Room implements RoomModel {
  id: string
  price: Price
  beds: string
  description: string
  img: string
  name: string
  people: string
  size: string

  constructor({ id, price, beds, description, img, name, people, size }: RoomModel) {
    this.id = id
    this.price = price ?? { amount: 0, currency: 'EUR' }
    this.beds = beds ?? ''
    this.description = description ?? ''
    this.img = img ?? ''
    this.name = name ?? ''
    this.people = people ?? ''
    this.size = size ?? ''
  }
}
