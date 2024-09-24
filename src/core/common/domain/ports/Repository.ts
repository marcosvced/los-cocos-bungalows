export interface Repository<T> {
  // TODO: add other common methods like add, delete, etc
  // getBy: () => Promise<T>
  // getAll: () => Promise<T[]>
  getAllBy: (...args: any[]) => Promise<T[]>
}
