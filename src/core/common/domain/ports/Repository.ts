export interface Repository<T = any> {
  // TODO: add other common methods like delete, etc
  // getBy: (...args: any[]) => Promise<T>
  // getAll: () => Promise<T[]>
  get?: () => Promise<T>
  getAllBy?: (...args: any[]) => Promise<T[]>
  save?: (...args: any[]) => Promise<void>
}
