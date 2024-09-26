<script setup lang="ts">
import type { Price } from '@/core/common/domain/entities/price'
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'
import { useDateFormat } from '@/lib/hooks/useDateFormat'
import { useMoney } from '@/lib/hooks/useMoney'
import AButton from '@/lib/ui/atoms/a-button.vue'

interface Details extends BookingDetails {
  amount: Price
}
interface Props {
  details?: Details
}

defineProps<Props>()
const emit = defineEmits<{ (event: 'onSaveClick'): void }>()
</script>

<template>
  <div class="p-4 border border-gray-light">
    <h2 class="mb-8 text-xl font-bold">
      Reservation summary
    </h2>
    <h3 class="mb-4 font-bold">
      {{ details?.room?.name ?? '-' }}
    </h3>
    <div class="mb-4 space-y-8 text-sm">
      <div class="flex space-x-12">
        <div>
          <p><strong>Check in</strong></p>
          <p>From 15.00h</p>
        </div>
        <div>
          <p><strong>Check out</strong></p>
          <p>Before 12.00h</p>
        </div>
      </div>
      <div>
        <p><strong>Reservation date</strong></p>
        <p>
          From
          {{ details?.dates ? useDateFormat(details?.dates.arrivalDate.toJSDate()) : '-' }}
          to
          {{ details?.dates ? useDateFormat(details?.dates.departureDate.toJSDate()) : '-' }}
        </p>
      </div>
      <div>
        <p><strong>People</strong></p>
        <p>{{ details?.pax?.adults ?? '-' }} Adults</p>
        <p v-if="details?.pax?.children">
          {{ details?.pax?.children }} Children
        </p>
      </div>
    </div>
    <hr class="mb-4 border-0 border-t border-gray-light">
    <p v-if="details?.discount" class="flex justify-between mb-4">
      <span>Discount</span>
      <span>{{ details?.discount ?? '-' }}%</span>
    </p>
    <p class="flex justify-between mb-8">
      <b>Total</b>
      <span>{{ details ? useMoney(details.amount) : '-' }}</span>
    </p>
    <AButton class="w-full" @click="emit('onSaveClick')">
      Save
    </AButton>
  </div>
</template>

<style scoped>
.button {
  display: block;
  width: 100%;
  background-color: #0162B3;
  color: white;
  padding: 10px;
  font-size: 1rem;
  line-height: 1.5rem;
  min-width: 7rem;
  transition: all 0.3s ease;
}
</style>
