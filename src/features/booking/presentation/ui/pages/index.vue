<script lang="ts" setup>
import type { RoomState } from '@/core/room/presentation/bloc/RoomState'
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
      {{ error }}
    </p>
  </template>

  <template v-if="roomState.data">
    <MHeroSearchBox
      v-if="defaultsSearchBox"
      :defaults="defaultsSearchBox"
      @on-change="onSearchBoxChangeHandler"
    />
    <div class="max-w-6xl p-8 mx-auto mb-4">
      <h1 class="mb-2 text-2xl font-display">
        Rooms & Rates
      </h1>
      <p class="mb-4">
        Plan your perfect stay at your hotel
      </p>
      <img src="@/lib/assets/img/path.png" alt="Path" width="400">
    </div>
    <div class="max-w-6xl p-8 mx-auto flex mb-16 space-x-4">
      <div class="w-2/3 space-y-4">
        <BookingRoom
          v-for="room in (roomState as RoomState).data?.list ?? []"
          :key="room.name" :room="room"
          class="p-4 transition-all duration-300 border cursor-pointer border-gray-light hover:bg-gray-light hover:bg-opacity-20 hover:shadow-sm"
          @click="onRoomClickHandler(room)"
        />
      </div>
      <BookingSummary
        class="w-1/3 h-min"
        :details="bookingState.data"
        @on-save-click="onSaveClickHandler"
      />
    </div>
  </template>
</template>

<style scoped>

</style>
