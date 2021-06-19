<template>
  <footer class="app-footer">
    <app-spacer />
    <div>
      &copy; {{ new Date().getFullYear() }}
      <a href="mailto:thezzisu@gmail.com">Zisu Zhang</a>
    </div>
    <app-spacer />
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSpacer from '@/components/AppSpacer.vue'
import { mdiGithub } from '@mdi/js'

export default defineComponent({
  components: { AppSpacer },
  setup() {
    return {
      mdiGithub
    }
  }
})
</script>
