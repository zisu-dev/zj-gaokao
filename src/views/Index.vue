<template>
  <div>
    <z-description />
    <hr class="mt-4" />
    <z-filter />
    <hr class="mt-4" />
    <z-choose />
    <hr class="mt-4" />
    <z-download />
    <hr class="mt-4" />
    <z-beg />
  </div>
</template>

<script lang="ts">
import ZDescription from '@/components/Description.vue'
import ZFilter from '@/components/Filter.vue'
import ZChoose from '@/components/Choose.vue'
import ZDownload from '@/components/Download.vue'
import ZBeg from '@/components/Beg.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { ZFilter, ZChoose, ZDownload, ZDescription, ZBeg }
})
</script>
