export interface RoomModel {
  name?: string
  description?: string
  size?: string
  beds?: string
  people?: string
  amount?: number
  img?: string
}

export class Room implements RoomModel {
  amount: number
  beds: string
  description: string
  img: string
  name: string
  people: string
  size: string

  constructor({ amount, beds, description, img, name, people, size }: RoomModel) {
    this.amount = amount ?? ''
    this.beds = beds ?? ''
    this.description = description ?? ''
    this.img = img ?? ''
    this.name = name ?? ''
    this.people = people ?? ''
    this.size = size ?? ''
  }
}
