<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
}
withDefaults(defineProps<Props>(), { variant: 'primary' })
</script>

<template>
  <button type="button" :class="`${variant}-btn`">
    <slot />
  </button>
</template>

<style scoped>

</style>
