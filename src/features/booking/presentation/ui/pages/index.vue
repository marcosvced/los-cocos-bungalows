<script lang="ts" setup>
import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingState } from '@/features/booking/presentation/bloc/BookingState'
import { ApplyDiscountAction } from '@/features/booking/presentation/bloc/actions/ApplyDiscountAction'
import { GetRoomsAction } from '@/features/booking/presentation/bloc/actions/GetRoomsAction'
import { SaveAction } from '@/features/booking/presentation/bloc/actions/SaveAction'
import { UpdateDatesAction } from '@/features/booking/presentation/bloc/actions/UpdateDatesAction'
import { UpdatePaxAction } from '@/features/booking/presentation/bloc/actions/UpdatePaxAction'

import { UpdateRoomAction } from '@/features/booking/presentation/bloc/actions/UpdateRoomAction'
import { BookingBloc } from '@/features/booking/presentation/bloc/BookingBloc'
import RoomCard from '@/features/booking/presentation/ui/components/room-card.vue'
import SummaryCard from '@/features/booking/presentation/ui/components/summary-card.vue'
import { useBLoC } from '@/lib/hooks/useBLoC'
import HeroSearchBox from '@/lib/ui/molecules/hero-search-box.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { promo_code } = route.query

const bloc = new BookingBloc()
const state = useBLoC<BookingState>(bloc)

const defaultsSearchBox = ref()
onMounted(async () => {
  await bloc.dispatch(new GetRoomsAction())
  if (Number.isInteger(Number.parseInt(promo_code as string))) {
    await bloc.dispatch(new ApplyDiscountAction(Number.parseInt(promo_code as string)))
  }
  defaultsSearchBox.value = {
    arrivalDate: state.value.data?.details?.dates?.arrivalDate,
    departureDate: state.value.data?.details?.dates?.departureDate,
    adults: state.value.data?.details?.pax?.adults,
    children: state.value.data?.details?.pax?.children,
  }
})

function onRoomClickHandler(room: Room) {
  bloc.dispatch(new UpdateRoomAction(room))
}

function onSearchBoxChangeHandler(payload: any) {
  const { adults, children, arrivalDate, departureDate } = payload
  bloc.dispatch(new UpdatePaxAction(adults, children))
  bloc.dispatch(new UpdateDatesAction(arrivalDate, departureDate))
}

function onSaveClickHandler() {
  bloc.dispatch(new SaveAction())
}
</script>

<template>
  <template v-if="state.isLoading">
    <p>Loading ...</p>
  </template>
  <template v-else-if="0 < state.errors.length">
    <p v-for="(error, index) in state.errors" :key="index">
      {{ error }}
    </p>
  </template>
  <template v-else-if="state.data">
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
          v-for="room in state.data.rooms ?? []"
          :key="room.name" :room="room"
          class="p-4 transition-all duration-300 border cursor-pointer border-gray-light hover:bg-gray-light hover:bg-opacity-20 hover:shadow-sm"
          @click="onRoomClickHandler(room)"
        />
      </div>
      <SummaryCard
        class="w-1/3 h-min"
        :details="{ ...state.data.details, amount: state.data?.amount }"
        @on-save-click="onSaveClickHandler"
      />
    </div>
  </template>
</template>

<style scoped>

</style>
