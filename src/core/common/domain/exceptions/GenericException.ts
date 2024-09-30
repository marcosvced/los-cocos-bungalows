import { Exception } from '@/core/common/domain/exceptions/Exception'

export const GenericException = {
  UNEXPECTED: 'UnexpectedException',
  EMPTY: 'EmptyException',
}

export class UnexpectedException extends Exception {
  error: Error
  kind: string

  constructor() {
    super()
    this.error = new Error('🚨 Something went wrong.')
    this.kind = GenericException.UNEXPECTED
  }
}

export class EmptyException extends Exception {
  error: Error
  kind: string

  constructor(message: string) {
    super()
    this.error = new Error(message)
    this.kind = GenericException.EMPTY
  }
}
