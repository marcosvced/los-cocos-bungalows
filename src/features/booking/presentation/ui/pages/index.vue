<script lang="ts" setup>
import RoomCard from '@/features/booking/presentation/ui/components/room-card.vue'
import SummaryCard from '@/features/booking/presentation/ui/components/summary-card.vue'
import { useBookingBloc } from '@/features/booking/presentation/ui/composables/useBookingBloc'
import { useRoomBloc } from '@/features/booking/presentation/ui/composables/useRoomBloc'
import HeroSearchBox from '@/lib/ui/molecules/hero-search-box.vue'
import { onMounted, ref } from 'vue'

const { state: roomState } = useRoomBloc()
const {
  state: bookingState,
  onRoomClickHandler,
  onSearchBoxChangeHandler,
  onSaveClickHandler,
} = useBookingBloc()

const defaultsSearchBox = ref()
onMounted(async () => {
  defaultsSearchBox.value = {
    arrivalDate: bookingState.value.data?.dates?.arrivalDate,
    departureDate: bookingState.value.data?.dates?.departureDate,
    adults: bookingState.value.data?.pax?.adults,
    children: bookingState.value.data?.pax?.children,
  }
})
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
  <template v-else-if="roomState.data">
    <HeroSearchBox v-if="defaultsSearchBox" :defaults="defaultsSearchBox" @on-change="onSearchBoxChangeHandler" />
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
        <RoomCard
          v-for="room in roomState.data.list ?? []"
          :key="room.name" :room="room"
          class="p-4 transition-all duration-300 border cursor-pointer border-gray-light hover:bg-gray-light hover:bg-opacity-20 hover:shadow-sm"
          @click="onRoomClickHandler(room)"
        />
      </div>
      <SummaryCard
        class="w-1/3 h-min"
        :details="bookingState.data"
        @on-save-click="onSaveClickHandler"
      />
    </div>
  </template>
</template>

<style scoped>

</style>
