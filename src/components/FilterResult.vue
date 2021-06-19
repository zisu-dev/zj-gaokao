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
import { filteredData, IMajorData } from '@/db/data'
import { mdiPlus } from '@mdi/js'
import { defineComponent } from 'vue'
import Icon from '@/components/Icon.vue'

export default defineComponent({
  components: { Icon },
  setup() {
    const columns = {
      schoolId: '院校代码',
      schoolName: '院校名称',
      majorId: '专业代码',
      majorName: '专业名称',
      schema: '学制',
      province: '省',
      city: '城市',
      trash: '本专科',
      count: '计划数',
      requirement: '选考科目要求',
      charge: '收费标准',
      remark: '备注'
    }
    function add(data: IMajorData) {
      const { schoolId, schoolName, majorId, majorName } = data
      const id = schoolId + '-' + majorId
      addMajor({ id, schoolId, schoolName, majorId, majorName })
    }
    return { columns, filteredData, mdiPlus, add }
  }
})
</script>
