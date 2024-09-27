<script setup lang="ts">
import ALogo from '@/lib/ui/atoms/a-logo.vue'
</script>

<template>
  <footer>
    <div class="footer__wrapper ">
      <nav>
        <ALogo variant="small" />
        <a href="#">Terms and Conditions</a>
        <a href="#">Privacy Policy</a>
        <a href="#">About us</a>
        <a href="#">Partners</a>
      </nav>
      <div class="wrapper__contact ">
        <a href="#">reservations@loscocosbungalows.com</a>
        <a href="#">Tlf: +34 555 555 555</a>
        <img src="@/lib/assets/img/footer_icons.png" width="125">
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  @apply
  p-4
  border-t
  border-gray-light;
}

.footer__wrapper {
  @apply
  flex
  flex-col lg:flex-row
  justify-between
  mx-auto
  text-sm
  max-w-[80rem]
  space-y-8 lg:space-y-0;
}

nav {
  @apply
  flex
  flex-col lg:flex-row
  items-center
  space-y-2 lg:space-y-0 lg:space-x-4;
}

.wrapper__contact {
  @apply
  flex
  flex-col lg:flex-row
  items-center
  space-y-2 lg:space-y-0 lg:space-x-4;
}
</style>
