import type { Faker } from '@faker-js/faker'
import { faker } from '@faker-js/faker'

export abstract class Factory<T> {
  faker: Faker
  protected abstract fake(): T

  protected constructor() {
    this.faker = faker
  }

  static new<T>(this: new () => Factory<T>): Factory<T> {
    return new this()
  }

  create(overrides: Partial<T> = {}): T {
    return { ...this.fake(), ...overrides }
  }

  times(count: number, overrides?: Partial<T>): T[] {
    return Array.from({ length: count }).map(() => this.create(overrides))
  }
}
