<script setup lang="ts">
import ALogo from '@/lib/ui/atoms/a-logo.vue'
import { ref } from 'vue'

interface Nav {
  href: string
  label: string
}

const menu: Nav[][] = [
  [
    { href: '#', label: 'Home' },
    { href: '#', label: 'Rooms' },
    { href: '#', label: 'Restaurant' },
  ],
  [
    { href: '#', label: 'Weedings' },
    { href: '#', label: 'Membership' },
    { href: '#', label: 'Contact' },
  ],
]

const isMenuOpen = ref(false)
function onToggleClickHandler() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header>
    <ALogo class="header__logo" />
    <menu :aria-expanded="isMenuOpen">
      <ul>
        <li v-for="(item, index) in menu[0]" :key="`${item.label.toLowerCase()}__${index}`">
          <a :href="item.href">{{ item.label }}</a>
        </li>
      </ul>
      <ALogo class="menu__logo" />
      <ul>
        <li v-for="(item, index) in menu[1]" :key="`${item.label.toLowerCase()}__${index}`">
          <a :href="item.href">{{ item.label }}</a>
        </li>
      </ul>
    </menu>
    <span class="header__toggle-btn" @click="onToggleClickHandler">
      menu
    </span>
  </header>
</template>

<style scoped>
header {
  @apply
  sticky
  flex
  justify-between
  items-center
  z-50
  top-0
  bg-white
  w-full
  border-b-2
  border-gray-light;
}

.header__logo,
.header__toggle-btn {
  @apply p-4 lg:hidden relative z-10;
}

menu {
  --translate: 100%;
  transform: translateX(var(--translate));
  transition: transform .25s ease-in-out;

  @apply
  fixed lg:relative
  top-0
  z-0
  w-full
  h-full lg:h-min
  bg-white
  flex
  flex-col lg:flex-row
  justify-center lg:justify-between
  lg:items-center
  lg:transform-none
  max-w-6xl
  lg:px-8
  lg:py-4
  mx-auto;
}

menu[aria-expanded="true"] {
  --translate: 0%;
}

ul {
  @apply
  flex
  flex-col lg:flex-row
  justify-between
  w-1/3
  space-y-4 lg:space-y-0
  mb-4 lg:mb-0
  px-4 lg:px-0;
}

a {
  @apply
  transition-colors
  duration-300
  hover:text-primary;
}

.menu__logo {
  @apply hidden lg:block;
}
</style>
