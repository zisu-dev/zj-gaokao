<template>
  <div class="card">
    <div class="card-header">步骤1: 选择志愿 ({{ majors.length }}/80)</div>
    <div class="px-4">
      <div class="mt-1 first-of-type:mt-0 border-b border-dark-50 flex items-center">
        <div class="mx-2">操作</div>
        <div class="mx-2">序号</div>
        <div class="flex-auto text-center">大学-专业</div>
      </div>
    </div>
    <draggable :list="majors" item-key="id" class="p-4">
      <template #item="{ element, index }">
        <div class="mt-1 first-of-type:mt-0 border border-dark-50 flex items-center">
          <div class="btn hover:text-red-600">
            <icon :icon="mdiDelete" @click="removeMajor(element.id)" />
          </div>
          <div class="mr-4">{{ index + 1 }}</div>
          <div class="flex-auto text-center">{{ element.schoolName }} - {{ element.majorName }}</div>
        </div>
      </template>
    </draggable>
    <div contenteditable class="border-2 border-black w-full font-mono" @paste.prevent="onPaste">在导出表中选择目标行，在此粘贴</div>
    <div class="flex">
      <div class="btn btn-blue" @click="loadMajors">加载</div>
      <div class="btn btn-green" @click="saveMajors">保存</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import Icon from '@/components/Icon.vue'
import { mdiDelete } from '@mdi/js'
import { majors, addMajor, removeMajor, save, load } from '@/db'
import toast from '@/plugins/toast'

export default defineComponent({
  components: { draggable, Icon },
  setup() {
    function onPaste(ev: ClipboardEvent) {
      const items = ev.clipboardData?.items
      if (!items) return
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.kind === 'string' && item.type === 'text/plain') {
          item.getAsString((data) => {
            const cols = data.split('\t').map((x) => x.trim())
            const schoolId = cols[1]
            const schoolName = cols[2]
            const majorId = cols[3]
            const majorName = cols[4]
            if (schoolId && schoolName && majorId && majorName) {
              const id = schoolId + '-' + majorId
              addMajor({ id, schoolId, schoolName, majorId, majorName })
            } else {
              toast.error({ message: '无效格式' })
            }
          })
        }
      }
    }
    function saveMajors() {
      save('default')
    }
    function loadMajors() {
      load('default')
    }
    return { majors, removeMajor, saveMajors, loadMajors, onPaste, mdiDelete }
  }
})
</script>

<style>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
