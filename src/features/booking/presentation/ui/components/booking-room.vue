<script setup lang="ts">
import type { Room } from '@/core/room/domain/entities/Room'
import { useMoney } from '@/lib/hooks/useMoney'

interface Props {
  room: Room
  isActive?: boolean
}

withDefaults(defineProps<Props>(), { isActive: false })
</script>

<template>
  <div
    class="booking-room"
    :class="{ '-is-active': isActive }"
  >
    <img :src="room.img" alt="Mini Dreamy Room" class="booking-room__cover">
    <div class="booking-room__details">
      <p class="mb-2 text-base font-display font-bold">
        {{ room.name ? room.name : undefined }}
      </p>

      <p class="flex-1">
        {{ room.description }}
      </p>
      <p class="mb-6">
        Size: {{ room.size }}
      </p>

      <div class="flex items-baseline space-x-4 md:space-x-16">
        <p>
          <img src="@/lib/assets/img/double-bed.svg" class="w-8 mb-1">
          <span>Beds: {{ room.beds }}</span>
        </p>

        <p class="flex-1">
          People: {{ room.people }}
        </p>
        <p class="font-bold text-xl">
          {{ useMoney(room.price) }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.booking-room {
  @apply
  flex
  flex-col
  md:flex-row
  p-4
  md:space-x-4
  border
  border-gray-light
  cursor-pointer
  hover:bg-gray-light
  hover:bg-opacity-20
  hover:shadow-sm
  transition-all
  duration-300;
}

.booking-room.-is-active {
  @apply
  shadow-sm
  border-primary;
}

.booking-room__cover {
  @apply object-cover mb-2 lg:mb-0 md:w-1/3 h-full;
}

.booking-room__details {
  @apply
  flex
  flex-col
  md:w-2/3
  text-sm;
}
</style>
