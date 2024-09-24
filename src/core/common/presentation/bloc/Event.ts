export interface Event<T> {
  execute: (...args: any[]) => T | Promise<T>
}
