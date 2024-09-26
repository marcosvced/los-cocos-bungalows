<script setup lang="ts">
import type { DateTime } from 'luxon'
import { useDate } from '@/lib/hooks/useDate'
import AButton from '@/lib/ui/atoms/a-button.vue'
import ADatepicker from '@/lib/ui/atoms/a-datepicker.vue'
import ASelect from '@/lib/ui/atoms/a-select.vue'
import { useSearchBoxDates } from '@/lib/ui/molecules/heroSearchBox/composables/useSearchBoxDates'
import { useSearchBoxPax } from '@/lib/ui/molecules/heroSearchBox/composables/useSearchBoxPax'

interface Props {
  defaults?: {
    arrivalDate?: DateTime
    departureDate?: DateTime
    adults?: number
    children?: number
  }
}

interface OnChange {
  arrivalDate: DateTime
  departureDate: DateTime
  adults: number
  children: number
}

const props = defineProps<Props>()

const emit = defineEmits<{ (event: 'onChange', payload: OnChange): void }>()

const { departureDate, arrivalDate } = useSearchBoxDates({
  arrivalDate: props.defaults.arrivalDate,
  departureDate: props.defaults.departureDate,
})

const { adults, adultsOptions, children, childrenOptions } = useSearchBoxPax({
  adults: props.defaults.adults,
  children: props.defaults.children,
})

function onModifyClick() {
  emit('onChange', {
    arrivalDate: arrivalDate.value,
    departureDate: departureDate.value,
    adults: adults.value,
    children: children.value,
  })
}
</script>

<template>
  <div class="hero mb-4">
    <div class="flex justify-center px-8 py-4 bg-primary bg-opacity-40 space-x-4">
      <ADatepicker v-model:date="arrivalDate" :limit-date="useDate('today')" />
      <ADatepicker v-model:date="departureDate" :limit-date="useDate(arrivalDate.toJSDate(), { plus: 1 })" />
      <ASelect v-model:value="adults" :options="adultsOptions" />
      <ASelect v-model:value="children" :options="childrenOptions" />
      <AButton @click="onModifyClick">
        Modify
      </AButton>
    </div>
  </div>
</template>

<style scoped>
.hero {
  @apply bg-cover;
  @apply bg-center;
  @apply bg-no-repeat;
  background-image: url(@/lib/assets/img/los-cocos-room-header-2-x.png);
}
</style>
