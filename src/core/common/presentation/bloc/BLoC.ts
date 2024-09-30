import type { Exception } from '@/core/common/domain/exceptions/Exception'
import type { State } from '@/core/common/presentation/bloc/State'

export type Observer<S> = (state: S) => void

export abstract class BLoC<S> {
  private _state: S
  private _observers: Observer<S>[] = []

  protected constructor(private readonly initialState: S) {
    this._state = initialState
  }

  abstract dispatch(event: any): Promise<void>
  abstract handelException(exception: Exception): void

  get state() {
    return this._state
  }

  set state(state: S) {
    this._state = state

    if (this._observers.length > 0) {
      this._observers.forEach(observer => observer(state))
    }
  }

  // eslint-disable-next-line accessor-pairs
  set isLoading(isLoading: boolean) {
    this.state = { ...this.state, isLoading }
  }

  // eslint-disable-next-line accessor-pairs
  set error(error: Exception) {
    const { errors } = this.state as State<S>
    errors.push(error)
    this.state = { ...this.state, errors }
  }

  subscribe(listener: Observer<S>) {
    this._observers.push(listener)
  }

  unsubscribe(listener: Observer<S>) {
    const index = this._observers.indexOf(listener)
    if (index > -1) {
      this._observers.splice(index, 1)
    }
  }
}
