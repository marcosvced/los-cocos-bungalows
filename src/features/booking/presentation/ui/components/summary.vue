<script setup lang="ts">
import type { BookingDetails } from '@/features/booking/domain/entities/BookingDetails'
import { reactive } from 'vue'

interface Props {
  details?: BookingDetails
}
defineProps<Props>()

const data = reactive({
  roomName: '-',
  checkinDate: '-',
  checkoutDate: '-',
  adults: '-',
  total: '-',
})

function updateReservationData(reservationData: any) {
  data.checkinDate = reservationData.startDate
  data.checkoutDate = reservationData.endDate
  data.adults = reservationData.adults
}
function saveHandler() {

}
</script>

<template>
  <div class="p-4 border border-gray-light">
    <h2 class="mb-8 text-xl">
      <strong>Reservation summary</strong>
    </h2>
    <h3 class="mb-4">
      <strong>{{ details?.room.name ?? '-' }}</strong>
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
        <p>From {{ data.checkinDate }} to {{ data.checkoutDate }}</p>
      </div>
      <div>
        <p><strong>People</strong></p>
        <p>{{ data.adults }} Adults</p>
      </div>
    </div>
    <hr class="mb-4 border-0 border-t border-gray-light">
    <div class="flex justify-between mb-8">
      <p>Total</p>
      <p>{{ details?.amount ?? '-' }}</p>
    </div>
    <button class="button" @click="saveHandler">
      Save
    </button>
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
