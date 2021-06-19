<template>
  <div class="card">
    <div class="card-header">步骤0: 筛选志愿</div>
    <div>当前数据库中共有{{ majorsData.length }}条记录</div>
    <form @submit.prevent="onSubmit">
      <input id="file_input" type="file" />
      <input type="submit" value="加载" class="btn btn-blue" />
      <input type="reset" value="取消" class="btn btn-red" />
    </form>
    <h2 class="text-lg">学校筛选</h2>
    <label for="cb_1">启用</label>
    <input id="cb_1" v-model="eSF" type="checkbox" />
    <template v-if="eSF">
      <div>
        <label for="cb_1_1">985</label>
        <input id="cb_1_1" v-model="u985" type="checkbox" />
        <label for="cb_1_2">211</label>
        <input id="cb_1_2" v-model="u211" type="checkbox" />
        <label for="t_1">学校名称，半角逗号分隔</label>
        <input id="t_1" v-model="school" type="text" class="border border-dark-50" />
      </div>
    </template>

    <h2 class="text-lg">专业筛选</h2>
    <label for="cb_2">启用</label>
    <input id="cb_2" v-model="eMF" type="checkbox" />
    <template v-if="eMF">
      <div>
        <label for="t_2">专业名称，半角逗号分隔</label>
        <input id="t_2" v-model="major" type="text" class="border border-dark-50" />
      </div>
    </template>

    <h2 class="text-lg">高级筛选</h2>
    <label for="cb_3">启用</label>
    <input id="cb_3" v-model="eAF" type="checkbox" />
    <template v-if="eAF">
      <div>
        <textarea v-model="filterCode" class="font-mono text-xs w-full h-64 p-1 border border-dark-50" />
      </div>
    </template>
    <div class="flex">
      <div class="btn btn-green" @click="doFilter">筛选</div>
      <div class="btn btn-red" @click="clearFilter">清除</div>
    </div>
    <filter-result />
  </div>
</template>

<script lang="ts">
import toast from '@/plugins/toast'
import { clearFiltered, filterWith, IFilterOptions, loadDb, majorsData } from '@/db/data'
import { defineComponent, ref } from 'vue'
import FilterResult from '@/components/FilterResult.vue'

const init = `/* function filter(item, data) { */
// write function body here

/* } */
`

export default defineComponent({
  components: { FilterResult },
  setup() {
    const eSF = ref(false)
    const school = ref('')
    const u985 = ref(false)
    const u211 = ref(false)
    const eMF = ref(false)
    const major = ref('')
    const eAF = ref(false)
    const filterCode = ref(init)
    function onSubmit() {
      const el = document.getElementById('file_input') as HTMLInputElement
      const file = el.files?.[0]
      if (!file) {
        toast.info({ message: '请选择文件' })
        return
      }
      loadDb(file)
    }
    function doFilter() {
      const options: IFilterOptions = {}
      if (eSF.value) {
        options.school = school.value
        options.u985 = u985.value
        options.u211 = u211.value
      }
      if (eMF.value) options.major = ''
      if (eAF.value) options.fn = filterCode.value
      filterWith(options)
    }
    function clearFilter() {
      clearFiltered()
    }
    return { eSF, school, u985, u211, eMF, major, eAF, filterCode, majorsData, onSubmit, doFilter, clearFilter }
  }
})
</script>
