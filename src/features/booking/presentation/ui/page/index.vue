<script lang="ts" setup>
import type { Room } from '@/core/room/domain/entities/Room'
import type { BookingState } from '@/features/booking/presentation/bloc/BookingState'
import { BookingBloc } from '@/features/booking/presentation/bloc/BookingBloc'
import { GetRoomsEvent } from '@/features/booking/presentation/bloc/events/GetRoomsEvent'
import { UpdateDetailsEvent } from '@/features/booking/presentation/bloc/events/UpdateDetailsEvent'
import RoomSheet from '@/features/booking/presentation/ui/components/room-sheet.vue'
import Summary from '@/features/booking/presentation/ui/components/summary.vue'
import { useBLoC } from '@/lib/hooks/useBLoC'
import CustomSelect from '@/lib/ui/components/CustomSelect.vue'
import { onMounted, ref } from 'vue'
import Datepicker from 'vue3-datepicker'

const bloc = new BookingBloc()
const state = useBLoC<BookingState>(bloc)

onMounted(async () => {
  await bloc.dispatch(new GetRoomsEvent())
})

function onRoomClick(room: Room) {
  bloc.dispatch(new UpdateDetailsEvent(room))
}

const sd = ref()
const ed = ref()
const adults = ref('')
const children = ref('')
// const summary = ref(null)
//
//
// function modifyReservationHandler() {
//   if (summary.value) {
//     summary.value.updateReservationData({
//       startDate: new Intl.DateTimeFormat('en-US').format(sd.value),
//       endDate: new Intl.DateTimeFormat('en-US').format(ed.value),
//       adults: adults.value,
//     })
//     // eslint-disable-next-line no-alert
//     alert('Summary Updated')
//   }
// }
</script>

<template>
  <template v-if="state.isLoading">
    <p>Loading ...</p>
  </template>
  <template v-else-if="state.data">
    <div class="mb-4 hero">
      <div class="flex justify-center px-8 py-4 bg-primary bg-opacity-40">
        <div class="flex items-start space-x-4">
          <div class="calendar-wrapper">
            <Datepicker v-model="sd" class="calendar-input" />
          </div>
          <div class="calendar-wrapper">
            <Datepicker v-model="ed" class="calendar-input" />
          </div>
          <CustomSelect>
            <select v-model="adults">
              <option value="">
                Select Adults
              </option>
              <option value="1">
                Adults: 1
              </option>
              <option value="2">
                Adults: 2
              </option>
              <option value="3">
                Adults: 3
              </option>
              <option value="4">
                Adults: 4
              </option>
              <option value="5">
                Adults: 5
              </option>
            </select>
          </CustomSelect>
          <CustomSelect>
            <select v-model="children">
              <option value="">
                Select Children
              </option>
              <option value="0">
                Children: 0
              </option>
              <option value="1">
                Children: 1
              </option>
              <option value="2">
                Children: 2
              </option>
              <option value="3">
                Children: 3
              </option>
              <option value="4">
                Children: 4
              </option>
              <option value="5">
                Children: 5
              </option>
              <option value="6">
                Children: 6
              </option>
            </select>
          </CustomSelect>
          <button class="primary-btn" @click="modifyReservationHandler">
            Modify
          </button>
        </div>
      </div>
    </div>
    <div class="max-w-6xl p-8 mx-auto mb-4">
      <h1 class="mb-2 text-2xl font-display">
        Rooms & Rates
      </h1>
      <p class="mb-4">
        Plan your perfect stay at your hotel
      </p>
      <img src="@/lib/assets/img/path.png" alt="Path" width="400">
    </div>
    <div class="inline-block px-8 mb-16">
      <div class="float-left w-2/3 space-y-4">
        <RoomSheet
          v-for="room in state.data.rooms"
          :key="room.name" :room="room"
          class="p-4 transition-all duration-300 border cursor-pointer border-gray-light hover:bg-gray-light hover:bg-opacity-20 hover:shadow-sm"
          @click="onRoomClick(room)"
        />
      </div>
      <div class="float-right w-1/3 pl-4">
        <Summary :details="state.data.details" />
      </div>
    </div>
  </template>
</template>

<style scoped>
.hero {
  @apply bg-cover;
  @apply bg-center;
  @apply bg-no-repeat;
  background-image: url(@/lib/assets/img/los-cocos-room-header-2-x.png);
}

.calendar-wrapper {
  position: relative;
}

.calendar-wrapper:before {
  content: '';
  position: absolute;
  @apply right-2.5;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  width: 25px;
  height: 25px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(@/lib/assets/img/calendar-empty.svg);
  z-index: 100;
}
</style>

<style>
:root {
  --vdp-hover-bg-color: theme('colors.primary');
  --vdp-selected-bg-color: theme('colors.primary');
}

.calendar-input {
  @apply p-2 pr-8;
}
</style>
