import type { Exception } from '@/core/common/domain/exceptions/Exception'

export interface State<S> {
  isLoading: boolean
  errors: Exception[]
  data?: S
}
