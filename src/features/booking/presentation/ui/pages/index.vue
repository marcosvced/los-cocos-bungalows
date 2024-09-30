<script lang="ts" setup>
import type { RoomState } from '@/core/room/presentation/bloc/RoomState'
import type { BookingState } from '@/features/booking/presentation/bloc/BookingState'
import BookingRoom from '@/features/booking/presentation/ui/components/booking-room.vue'
import BookingSummary from '@/features/booking/presentation/ui/components/booking-summary.vue'
import { useBookingBloc } from '@/features/booking/presentation/ui/composables/useBookingBloc'
import { useRoomBloc } from '@/features/booking/presentation/ui/composables/useRoomBloc'
import MHeroSearchBox from '@/lib/ui/molecules/heroSearchBox/m-hero-search-box.vue'
import { computed } from 'vue'

const { state: roomState } = useRoomBloc()

const {
  state: bookingState,
  onRoomClickHandler,
  onSearchBoxChangeHandler,
  onSaveClickHandler,
} = useBookingBloc()

const defaultsSearchBox = computed(() => ({
  arrivalDate: bookingState.value.data?.dates?.arrivalDate,
  departureDate: bookingState.value.data?.dates?.departureDate,
  adults: bookingState.value.data?.pax?.adults,
  children: bookingState.value.data?.pax?.children,
}))
</script>

<template>
  <template v-if="roomState.isLoading || bookingState.isLoading">
    <p>Loading ...</p>
  </template>
  <template v-else-if="0 < bookingState.errors.length || 0 < roomState.errors.length">
    <p v-for="(error, index) in bookingState.errors" :key="index">
      {{ error.message() }}
    </p>
  </template>

  <template v-if="roomState.data && bookingState.data">
    <MHeroSearchBox
      v-if="defaultsSearchBox"
      :defaults="defaultsSearchBox"
      @on-change="onSearchBoxChangeHandler"
    />
    <main>
      <div class="booking__stepper ">
        <h1>
          Rooms & Rates
        </h1>
        <p class="mb-4">
          Plan your perfect stay at your hotel
        </p>
        <img src="@/lib/assets/img/path.png" alt="Path" width="400">
      </div>
      <div class="booking__details">
        <ul class="details__rooms">
          <li v-for="room in (roomState as RoomState).data?.list ?? []" :key="room.name">
            <BookingRoom
              :room="room"
              :is-active="(bookingState as BookingState).data?.room?.id === room.id"
              @click="onRoomClickHandler(room)"
            />
          </li>
        </ul>
        <BookingSummary
          class="details__summary"
          :details="bookingState.data"
          @on-save-click="onSaveClickHandler"
        />
      </div>
    </main>
  </template>
</template>

<style scoped>
main {
  @apply max-w-6xl mx-auto;
}

.booking__stepper {
  @apply p-8 mb-4;

  h1 {
    @apply mb-2 text-2xl font-display;
  }
}

.booking__details {
  @apply
  p-4 md:p-8
  flex
  flex-col-reverse lg:flex-row
  mb-8 lg:mb-16;
}

.details__rooms {
  @apply space-y-4 lg:w-2/3;
}
.details__summary {
  @apply mb-4 lg:ml-4 lg:mb-0 lg:w-1/3 h-min;
}
</style>
