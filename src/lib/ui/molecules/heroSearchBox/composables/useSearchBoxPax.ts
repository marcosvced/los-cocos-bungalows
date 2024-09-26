import { ref } from 'vue'

interface Defaults {
  adults?: number
  children?: number
}

export function useSearchBoxPax(defaults: Defaults) {
  const adultsOptions = [
    { value: 1, label: 'Adults: 1' },
    { value: 2, label: 'Adults: 2' },
    { value: 3, label: 'Adults: 3' },
    { value: 4, label: 'Adults: 4' },
    { value: 5, label: 'Adults: 5' },
  ]
  const childrenOptions = [
    { value: 0, label: 'Children: 0' },
    { value: 1, label: 'Children: 1' },
    { value: 2, label: 'Children: 2' },
    { value: 3, label: 'Children: 3' },
    { value: 4, label: 'Children: 4' },
    { value: 5, label: 'Children: 5' },
    { value: 6, label: 'Children: 6' },
  ]

  const adults = ref(defaults?.adults ?? 1)
  const children = ref(defaults?.children ?? 0)

  return {
    adults,
    children,
    adultsOptions,
    childrenOptions,
  }
}
