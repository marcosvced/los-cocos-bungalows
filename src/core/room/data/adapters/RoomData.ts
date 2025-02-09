import type { Repository } from '@/core/common/domain/ports/Repository'
import type { Room } from '@/core/room/domain/entities/Room'
import { RoomDto } from '@/core/room/data/dto/RoomDto'

const response = [
  {
    id: '01922e98-9c71-7331-92c0-3d83024444fc',
    name: 'Mini Dreamy Room',
    description: 'Generous and comfortable these modern furnished rooms offer two queen-size beds and are on the first floor.',
    size: '20m2',
    beds: '2',
    people: '2',
    amount: '200€',
    img: '/images/room_1.png',
  },
  {
    id: '01922e98-dcd9-7d9d-b1f5-ddc7732c841c',
    name: 'Seet Bungalow',
    description: 'The perfect blend of comfort and culture, our superior room with a central graden view has the stunning, and comes with a jacuzzi.',
    size: '50m2',
    beds: '2',
    people: '4',
    amount: '350€',
    img: '/images/room_2.png',
  },
  {
    id: '01922e99-1186-799b-88f7-4ecb6e0b0317',
    name: 'Los Cocos Suite',
    description: 'If you want a little extra form your stay, you might like our superior rooms. A ocean view room has a private beach and a helicopter :-).',
    size: '125m2',
    beds: '3',
    people: '4',
    amount: '450€',
    img: '/images/room_3.png',
  },
]

export class RoomData implements Repository<Room> {
  // TODO: add the filter params like dates
  async getAllBy() {
    const rooms: RoomDto[] = response.map(room => new RoomDto(room))
    return Promise.resolve(rooms.map(roomDto => roomDto.toDomain()))
  }
}
