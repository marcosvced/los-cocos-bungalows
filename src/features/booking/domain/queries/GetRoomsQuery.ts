import type { Repository } from '@/core/common/domain/ports/Repository'
import type { Query } from '@/core/common/domain/useCases/Query'
import type { Room } from '@/core/room/domain/entities/Room'

export class GetRoomsQuery implements Query<Room[]> {
  constructor(private readonly repository: Repository<Room>) {
  }

  async execute() {
    return await this.repository.getAllBy()
  }
}
