<template>
  <table class="result-table">
    <thead>
      <tr>
        <th>操作</th>
        <th v-for="(value, key) of columns" :key="key">
          {{ value }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) of filteredData" :key="i">
        <td>
          <div class="btn btn-dense flex justify-center" @click="add(item)">
            <icon :icon="mdiPlus" />
          </div>
        </td>
        <td v-for="(value, key) of columns" :key="key">
          {{ item[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { addMajor } from '@/db'
import { dataColumns, filteredData, IMajorData } from '@/db/data'
import { mdiPlus } from '@mdi/js'
import { defineComponent } from 'vue'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  components: { Icon },
  setup() {
    function add(data: IMajorData) {
      const { schoolId, schoolName, majorId, majorName } = data
      const id = schoolId + '-' + majorId
      addMajor({ id, schoolId, schoolName, majorId, majorName })
    }
    return { columns: dataColumns, filteredData, mdiPlus, add }
  }
})
</script>
