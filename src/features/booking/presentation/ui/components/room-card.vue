<script setup lang="ts">
import type { Room } from '@/core/room/domain/entities/Room'

interface Props {
  room: Room
}

defineProps<Props>()
</script>

<template>
  <div class="flex space-x-4">
    <img :src="room.img" alt="Mini Dreamy Room" class="object-cover w-1/3 h-full">
    <div class="flex flex-col w-2/3 text-sm">
      <p class="mb-2 text-base font-display font-bold">
        {{ room.name ? room.name : undefined }}
      </p>

      <p class="flex-1">
        {{ room.description }}
      </p>
      <p class="mb-6">
        Size: {{ room.size }}
      </p>

      <div class="flex items-baseline space-x-16">
        <p>
          <img src="@/lib/assets/img/double-bed.svg" class="w-8 mb-1">
          <span>Beds: {{ room.beds }}</span>
        </p>

        <p class="flex-1">
          People: {{ room.people }}
        </p>
        <p class="font-bold text-xl">
          {{ room.amount }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
