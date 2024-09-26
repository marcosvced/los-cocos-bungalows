import type { DateTime } from 'luxon'
import type { Ref } from 'vue'
import { useDate } from '@/lib/hooks/useDate'
import { ref } from 'vue'

interface Defaults {
  arrivalDate: DateTime
  departureDate: DateTime
}

export function useSearchBoxDates(defaults: Defaults) {
  const arrivalDate: Ref<DateTime> = ref(defaults?.arrivalDate ?? useDate('today'))
  const departureDate: Ref<DateTime> = ref(defaults?.departureDate ?? useDate('tomorrow'))
  return {
    arrivalDate,
    departureDate,
  }
}
