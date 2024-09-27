<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue'

interface Props {
  icon: string
}
const props = defineProps<Props>()

const icons = import.meta.glob('../../assets/icons/*.svg')

const internalIcon = ref(null)

watchEffect(async () => {
  const iconPath = `../../assets/icons/${props.icon}.svg`

  if (icons[iconPath]) {
    internalIcon.value = (await icons[iconPath]()).default
  }
  else {
    console.error(`Icon not found: ${props.icon}`)
    internalIcon.value = null
  }
})
</script>

<template>
  <span v-if="internalIcon" v-html="internalIcon" />
</template>

<style scoped>
span:deep(svg) {
  height: 1em;
  width: 1em;
}
</style>
