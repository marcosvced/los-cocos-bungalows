export interface Query<T> {
  execute: (...args: any[]) => Promise<T>
}
