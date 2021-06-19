<template>
  <header class="app-header fixed top-0 z-5 right-0 left-0 h-12 shadow flex flex-row items-center">
    <div class="px-4">高考志愿填报助手</div>
    <app-spacer />
    <div class="px-4">
      <a href="https://github.com/zisu-dev/zj-gaokao">
        <icon :icon="mdiGithub" />
      </a>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppSpacer from '@/components/AppSpacer.vue'
import { mdiGithub } from '@mdi/js'
import Icon from './Icon.vue'

export default defineComponent({
  components: { AppSpacer, Icon },
  setup() {
    return {
      mdiGithub
    }
  }
})
</script>
