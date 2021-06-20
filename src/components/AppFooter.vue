<template>
  <footer class="app-footer card-acrylic font-mono text-sm">
    <div class="btn btn-dense !px-2" @click="scrollToTop">
      <icon :icon="mdiArrowUp" />
    </div>
    <app-spacer />
    <div>&copy; {{ new Date().getFullYear() }} Zisu Zhang</div>
    <a href="mailto:thezzisu@gmail.com" class="pl-2">
      <icon :icon="mdiGmail" />
    </a>
    <a href="https://zisu.dev" class="px-2">
      <icon :icon="mdiWeb" />
    </a>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSpacer from '@/components/AppSpacer.vue'
import Icon from '@/components/Icon.vue'
import { mdiArrowUp, mdiGithub, mdiGmail, mdiWeb } from '@mdi/js'

export default defineComponent({
  components: { AppSpacer, Icon },
  setup() {
    function scrollToTop() {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
    return {
      scrollToTop,
      mdiGithub,
      mdiGmail,
      mdiWeb,
      mdiArrowUp
    }
  }
})
</script>
