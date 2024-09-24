<script setup lang="ts">
interface Props {
  variant?: 'small' | 'medium'
}
withDefaults(defineProps<Props>(), { variant: 'medium' })
</script>

<template>
  <img v-if="variant === 'medium'" src="@/lib/assets/img/logo-cocos.png" alt="Hotel Los Cocos" width="125">
  <img v-else-if="variant === 'small'" src="@/lib/assets/img/los-cocos-iso-footer.png" alt="Hotel Los Cocos" width="45">
</template>

<style scoped>

</style>
