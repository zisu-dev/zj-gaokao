<template>
  <div>
    <description />
    <choose class="mt-4" />
    <download class="mt-4" />
  </div>
</template>

<script lang="ts">
import Choose from '@/components/Choose.vue'
import Description from '@/components/Description.vue'
import Download from '@/components/Download.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { Choose, Download, Description }
})
</script>
