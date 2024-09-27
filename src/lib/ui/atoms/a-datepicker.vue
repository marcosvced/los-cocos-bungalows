<script setup lang="ts">
import type { DateTime } from 'luxon'
import { useDate } from '@/lib/hooks/useDate'
import AIcon from '@/lib/ui/atoms/a-icon.vue'
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
  <div class="a-datepicker">
    <Datepicker
      v-model="internalDate"
      :lower-limit="parsedLimit"
      input-format="dd/MM/yyyy"
    />
    <AIcon icon="calendar" class="icon" />
  </div>
</template>

<style scoped>
.a-datepicker {
  position: relative;
}
.icon {
  position: absolute;
  top: 50%;
  right: 1em;
  transform: translateY(-50%);
}
</style>
