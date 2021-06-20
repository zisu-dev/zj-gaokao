<template>
  <z-filter />
  <hr class="mt-4" />
  <z-choose />
  <hr class="mt-4" />
  <z-download />
</template>

<script lang="ts">
import ZFilter from '@/components/Filter.vue'
import ZChoose from '@/components/Choose.vue'
import ZDownload from '@/components/Download.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { ZFilter, ZChoose, ZDownload }
})
</script>
