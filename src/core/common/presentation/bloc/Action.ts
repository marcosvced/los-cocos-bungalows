export interface Action<T> {
  execute: (...args: any[]) => T | Promise<T>
}
