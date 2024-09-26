<script setup lang="ts">
interface Option {
  value: string | number
  label?: string
}

interface Props {
  value: string | number
  options: Option[]
}
defineProps<Props>()

const emit = defineEmits<{ (event: 'update:value', value: string): void }>()

function onChange(event: any) {
  emit('update:value', event.target.value)
}
</script>

<template>
  <div class="a-select">
    <select :value="value" @change="onChange">
      <option
        v-for="option in options as Option[]"
        :key="option.value" :value="option.value"
      >
        {{ option.label ?? option.value }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.a-select {
  display: grid;
  grid-template-areas: "select";
  width: 100%;
  min-width: 15ch;
  max-width: 30ch;
  align-items: center;
  @apply p-2;
  font-size: 1rem;
  cursor: pointer;
  line-height: 24px;
  background-color: #fff;
}
.a-select::after {
  content: "";
  grid-area: select;
  justify-self: end;
  width: 0.8em;
  height: 0.5em;
  @apply bg-gray;
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
}
select {
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;
  grid-area: select;
}
</style>
