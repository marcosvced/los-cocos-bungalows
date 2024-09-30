export abstract class Exception<T = any> {
  abstract kind: string
  abstract error: Error

  static throw<T, Args extends any[]>(
    this: new (...args: Args) => Exception<T>,
    ...args: Args
  ): never {
    throw new this(...args)
  }

  message() {
    return this.error.message
  }
}
