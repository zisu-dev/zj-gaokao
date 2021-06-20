<template>
  <div class="card card-acrylic">
    <div class="card-header">步骤2: 下载导入表</div>
    <p class="mt-1">
      <span class="btn btn-blue" @click="onDownloadExportSheet">下载</span>
    </p>
  </div>
</template>

<script lang="ts">
import { exportXls } from '@/db'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    function onDownloadExportSheet() {
      exportXls()
    }
    return { onDownloadExportSheet }
  }
})
</script>
