export interface DTO<T> {
  toDomain: () => T
}
