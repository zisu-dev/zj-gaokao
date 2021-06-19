<template>
  <header class="app-header">
    <div class="px-4">高考志愿填报助手</div>
    <app-spacer />
    <div class="px-4">
      <a href="https://zisu.dev">
        <img :src="ZisuIcon" width="16" height="16" />
      </a>
    </div>
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
import Icon from '@/components/Icon.vue'
import ZisuIcon from '@/assets/logo.svg'

export default defineComponent({
  components: { AppSpacer, Icon },
  setup() {
    return {
      mdiGithub,
      ZisuIcon
    }
  }
})
</script>
