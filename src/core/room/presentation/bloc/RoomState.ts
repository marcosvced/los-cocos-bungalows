import type { Exception } from '@/core/common/domain/exceptions/Exception'
import type { State } from '@/core/common/presentation/bloc/State'
import type { Room } from '@/core/room/domain/entities/Room'

export class RoomState implements State< { list: Room[] }> {
  data?: { list: Room[] }
  errors: Exception[]
  isLoading: boolean

  constructor({ errors, isLoading, data }: Partial<RoomState>) {
    this.data = data ?? undefined
    this.isLoading = isLoading ?? false
    this.errors = errors ?? []
  }
}
