<template>
  <div class="card card-acrylic">
    <div class="card-header">步骤0: 筛选志愿</div>
    <div>当前数据库中共有{{ majorsData.length }}条记录</div>
    <form @submit.prevent="onSubmit">
      <input id="file_input" type="file" />
      <input type="submit" value="加载" class="btn btn-blue" />
      <input type="reset" value="取消" class="btn btn-red" />
    </form>
    <h2 class="text-lg">学校筛选</h2>
    <label for="cb_1">启用</label>
    <input id="cb_1" v-model="enableSchoolFilter" type="checkbox" />
    <template v-if="enableSchoolFilter">
      <div>
        <div class="flex flex-wrap">
          <div class="m-1 p-1 border border-dark-200">
            <label for="cb_1_1">985</label>
            <input id="cb_1_1" v-model="u985" type="checkbox" />
          </div>
          <div class="m-1 p-1 border border-dark-200">
            <label for="cb_1_2">211</label>
            <input id="cb_1_2" v-model="u211" type="checkbox" />
          </div>
        </div>
        <div class="flex flex-wrap">
          <template v-for="(feature, i) of featuresData" :key="i">
            <div class="m-1 p-1 border border-dark-200">
              <label :for="'cb_1_3_' + i">{{ feature }}</label>
              <input :id="'cb_1_3_' + i" v-model="features[i]" type="checkbox" />
            </div>
          </template>
        </div>
        <label for="t_1">学校名称，半角逗号分隔</label>
        <input id="t_1" v-model="school" type="text" class="border border-dark-50" />
      </div>
    </template>

    <h2 class="text-lg">专业筛选</h2>
    <label for="cb_2">启用</label>
    <input id="cb_2" v-model="enableMajorFilter" type="checkbox" />
    <template v-if="enableMajorFilter">
      <div>
        <label for="t_2">专业名称，半角逗号分隔</label>
        <input id="t_2" v-model="major" type="text" class="border border-dark-50" />
      </div>
    </template>

    <h2 class="text-lg">高级筛选</h2>
    <label for="cb_3">启用</label>
    <input id="cb_3" v-model="enableAdvancedFilter" type="checkbox" />
    <template v-if="enableAdvancedFilter">
      <div>
        <textarea v-model="filterCode" class="font-mono text-xs w-full h-64 p-1 border border-dark-50" />
      </div>
    </template>
    <div class="flex items-center">
      <div class="btn btn-blue" @click="doFilter">筛选</div>
      <div class="btn btn-red" @click="clearFiltered">清除</div>
      <div class="btn btn-green" @click="exportFiltered">导出结果</div>
      <div class="btn btn-yellow" @click="addAll">全部添加</div>
      <div class="mx-2">筛选结果共{{ filteredData.length }}条</div>
    </div>
    <filter-result />
  </div>
</template>

<script lang="ts">
import toast from '@/plugins/toast'
import { featuresData, filteredData, loadDb, majorsData } from '@/db/data'
import { defineComponent } from 'vue'
import FilterResult from '@/components/FilterResult.vue'
import { useFilter } from '@/utils/filter'

export default defineComponent({
  components: { FilterResult },
  setup() {
    function onSubmit() {
      const el = document.getElementById('file_input') as HTMLInputElement
      const file = el.files?.[0]
      if (!file) {
        toast.info({ message: '请选择文件' })
        return
      }
      loadDb(file)
    }
    const filter = useFilter()
    return {
      ...filter,
      majorsData,
      filteredData,
      featuresData,
      onSubmit
    }
  }
})
</script>
