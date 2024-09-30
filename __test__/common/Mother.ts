// Mother.ts
export abstract class Mother<T> {
  abstract valid(): T
  abstract invalid(): T

  static new<T>(this: new () => Mother<T>): Mother<T> {
    return new this()
  }
}
