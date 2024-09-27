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
  arrivalDate: props.defaults?.arrivalDate,
  departureDate: props.defaults?.departureDate,
})

const { adults, adultsOptions, children, childrenOptions } = useSearchBoxPax({
  adults: props.defaults?.adults,
  children: props.defaults?.children,
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
  <div class="hero">
    <div class="hero__wrapper">
      <ADatepicker v-model:date="arrivalDate" class="flex-1" :limit-date="useDate('today')" />
      <ADatepicker v-model:date="departureDate" class="flex-1" :limit-date="useDate(arrivalDate.toJSDate(), { plus: 1 })" />
      <ASelect v-model:value="adults" class="flex-1" :options="adultsOptions" />
      <ASelect v-model:value="children" class="flex-1" :options="childrenOptions" />
      <AButton @click="onModifyClick">
        Modify
      </AButton>
    </div>
  </div>
</template>

<style scoped>
.hero {
  @apply bg-cover bg-center bg-no-repeat mb-4 relative;
  background-image: url(@/lib/assets/img/los-cocos-room-header-2-x.png);
}
.hero:before {
  content: '';
  @apply block w-full h-full absolute bg-primary bg-opacity-40 z-0;
}
.hero__wrapper {
  @apply
  max-w-6xl
  mx-auto
  flex
  flex-col lg:flex-row
  justify-center
  px-4 md:px-8
  py-4
  space-y-2 lg:space-y-0 lg:space-x-4
  relative
  z-10;

}
</style>
