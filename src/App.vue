<template>
  <div class="flex">
    <div class="flex-auto min-h-100vh">
      <app-header />
      <main class="mt-12 mb-8 flex-auto p-4">
        <router-view />
      </main>
      <app-footer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default defineComponent({
  name: 'App',
  components: { AppHeader, AppFooter }
})
</script>
