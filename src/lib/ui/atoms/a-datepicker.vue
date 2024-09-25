<script setup lang="ts">
import type { DateTime } from 'luxon'
import { useDate } from '@/lib/hooks/useDate'
import { computed } from 'vue'
import Datepicker from 'vue3-datepicker'

interface Props {
  date: DateTime
  limitDate?: DateTime
}

const props = defineProps<Props>()

const emit = defineEmits<{ (event: 'update:date', value: DateTime): void }>()

const parsedLimit = computed(() => props.limitDate?.toJSDate())
const internalDate = computed({
  get: () => props.date.toJSDate(),
  set: (date: Date) => emit('update:date', useDate(date)),
})
</script>

<template>
  <Datepicker
    v-model="internalDate"
    :lower-limit="parsedLimit"
  />
</template>

<style scoped>

</style>
