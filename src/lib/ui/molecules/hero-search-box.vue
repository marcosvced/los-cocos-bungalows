<script setup lang="ts">
import type { DateTime } from 'luxon'
import type { Ref } from 'vue'
import { useDate } from '@/lib/hooks/useDate'
import AButton from '@/lib/ui/atoms/a-button.vue'
import ADatepicker from '@/lib/ui/atoms/a-datepicker.vue'
import ASelect from '@/lib/ui/atoms/a-select.vue'
import { ref } from 'vue'

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

const props = withDefaults(defineProps<Props>(), {
  defaults: undefined,
})

const emit = defineEmits<{ (event: 'onChange', payload: OnChange): void }>()

const arrivalDate: Ref<DateTime> = ref(props.defaults?.arrivalDate ?? useDate('today'))
const departureDate: Ref<DateTime> = ref(props.defaults?.departureDate ?? useDate('tomorrow'))

const adults = ref(props.defaults?.adults ?? 1)
const children = ref(props.defaults?.children ?? 0)

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
