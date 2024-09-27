<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'

interface Props {
  icon: string
}
const props = defineProps<Props>()

const icons = import.meta.glob('../../assets/icons/*.svg')

const internalIcon = ref(null)

async function loadIcon(iconName) {
  const iconPath = `../../assets/icons/${iconName}.svg`

  if (icons[iconPath]) {
    internalIcon.value = (await icons[iconPath]()).default
  }
  else {
    console.error(`Icon not found: ${iconName}`)
    internalIcon.value = null
  }
}

loadIcon(props.icon)

watch(() => props.icon, (newIcon) => {
  loadIcon(newIcon)
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
