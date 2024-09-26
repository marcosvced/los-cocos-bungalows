export interface Repository<T = never> {
  // TODO: add other common methods like add, delete, etc
  // getBy: (...args: any[]) => Promise<T>
  // getAll: () => Promise<T[]>
  get: () => Promise<T>
  getAllBy: (...args: any[]) => Promise<T[]>
  save: (...args: any[]) => Promise<void>
}
