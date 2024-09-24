<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  }
})
</script>

<template>
  <div class="custom-select">
    <slot />
  </div>
</template>

<style scoped>
.custom-select {
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
.custom-select::after {
  content: "";
  grid-area: select;
  justify-self: end;
  width: 0.8em;
  height: 0.5em;
  @apply bg-gray;
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
}
</style>
<style>
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