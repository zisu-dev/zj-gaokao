<template>
  <z-filter />
  <z-choose class="mt-4" />
  <z-download class="mt-4" />
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
