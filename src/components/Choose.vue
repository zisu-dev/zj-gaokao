<template>
  <div class="card card-acrylic">
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
    <div>
      <label for="cb_1">自动保存</label>
      <input id="cb_1" v-model="autoSave" type="checkbox" />
    </div>
    <div class="flex">
      <template v-if="!autoSave">
        <div class="btn btn-blue" @click="loadMajors">加载</div>
        <div class="btn btn-green" @click="saveMajors">保存</div>
      </template>
      <div class="btn btn-red" @click="clear">清空</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import Icon from '@/components/Icon.vue'
import { mdiDelete } from '@mdi/js'
import { majors, removeMajor, save, load, autoSave, clearMajors, K_NAME_DEFAULT, importFromPaste } from '@/db'

export default defineComponent({
  components: { draggable, Icon },
  setup() {
    function saveMajors() {
      save(K_NAME_DEFAULT)
    }
    function loadMajors() {
      load(K_NAME_DEFAULT)
    }
    return { majors, removeMajor, saveMajors, loadMajors, clear: clearMajors, onPaste: importFromPaste, autoSave, mdiDelete }
  }
})
</script>
