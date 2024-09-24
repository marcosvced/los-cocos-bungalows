import type { Query } from '@/core/common/domain/actions/Query'
import type { Repository } from '@/core/common/domain/ports/Repository'
import type { Room } from '@/core/room/domain/entities/Room'

export class GetRoomsAction implements Query<Room[]> {
  constructor(private readonly repository: Repository<Room>) {
  }

  async execute() {
    return await this.repository.getAllBy()
  }
}
