export interface State<S> {
  isLoading: boolean
  errors: Error[]
  data?: S
}
