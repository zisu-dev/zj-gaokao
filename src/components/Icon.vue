<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="icon" :style="{ width: size, height: size }">
    <path :d="icon"></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 24
    }
  }
})
</script>

<style>
.icon {
  fill: currentColor;
}
</style>
