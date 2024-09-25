<script setup lang="ts">
import ALogo from '@/lib/ui/atoms/a-logo.vue'
</script>

<template>
  <header class="flex justify-between max-w-6xl px-8 py-4 mx-auto">
    <nav class="flex justify-between w-1/3">
      <a href="#" class="menu-btn">Home</a>
      <a href="#" class="menu-btn">Rooms</a>
      <a href="#" class="menu-btn">Restaurant</a>
    </nav>
    <ALogo />
    <nav class="flex justify-between w-1/3">
      <a href="#" class="menu-btn">Weedings</a>
      <a href="#" class="menu-btn">Membership</a>
      <a href="#" class="menu-btn">Contact</a>
    </nav>
  </header>
</template>

<style scoped>
.menu-btn {
  @apply transition-colors;
  @apply duration-300;
}
.menu-btn:hover {
  @apply text-primary;
}
</style>
