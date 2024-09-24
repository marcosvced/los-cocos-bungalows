<script setup lang="ts">
import type { Room } from '@/core/room/domain/entities/Room'

interface Props {
  room: Room
}

defineProps<Props>()
</script>

<template>
  <div class="flex space-x-4">
    <div class="w-1/3">
      <img :src="room.img" alt="Mini Dreamy Room" class="object-cover w-full h-full">
    </div>
    <div class="flex flex-col w-2/3 text-sm">
      <p class="mb-2 text-base font-display">
        <strong>{{ room.name ? room.name : undefined }}</strong>
      </p>

      <p class="flex-1">
        {{ room.description }}
      </p>
      <p class="mb-6">
        Size: {{ room.size }}
      </p>
      <div class="flex items-baseline space-x-16">
        <div>
          <img src="@/lib/assets/img/double-bed.svg" class="w-8 mb-1">
          <p>Beds: {{ room.beds }}</p>
        </div>
        <div class="flex-1">
          People: {{ room.people }}
        </div>
        <div class="text-xl">
          <strong>{{ room.amount }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
