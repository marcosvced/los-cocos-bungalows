<script setup lang="ts">
import ALogo from '@/lib/ui/atoms/a-logo.vue'
</script>

<template>
  <footer class="p-4 border-t border-gray-light">
    <div class="flex justify-between mx-auto text-sm max-w-[80rem]">
      <div class="flex items-center space-x-4">
        <ALogo variant="small" />
        <a href="#">Terms and Conditions</a>
        <a href="#">Privacy Policy</a>
        <a href="#">About us</a>
        <a href="#">Partners</a>
      </div>
      <div class="flex items-center space-x-4">
        <a href="#">reservations@loscocosbungalows.com</a>
        <a href="#">Tlf: +34 555 555 555</a>
        <img src="@/lib/assets/img/footer_icons.png" width="125">
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>
