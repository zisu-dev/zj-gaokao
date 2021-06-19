import toast from '@/plugins/toast'
import { ref, toRaw, watch } from 'vue'
import XLSX from 'xlsx'

interface IMajor {
  id: string
  schoolId: string
  schoolName: string
  majorId: string
  majorName: string
}

const K_AUTOSAVE = 'autosave'
export const K_NAME_DEFAULT = 'default'

export const majors = ref<IMajor[]>([])
const majorsSet = new Set<string>()

export const autoSave = ref(!!localStorage.getItem(K_AUTOSAVE))

// Load autosave
;(function () {
  if (autoSave.value) {
    load(K_NAME_DEFAULT)
  }
})()

watch(autoSave, () => {
  if (autoSave.value) save(K_NAME_DEFAULT)
  localStorage.setItem(K_AUTOSAVE, autoSave.value ? '1' : '')
})

watch(
  majors,
  () => {
    if (autoSave.value) {
      save(K_NAME_DEFAULT)
    }
  },
  { deep: true }
)

export function addMajor(major: IMajor): void {
  if (majorsSet.has(major.id)) {
    toast.info({ message: '勿添加重复专业' })
    return
  }
  majorsSet.add(major.id)
  majors.value.push(major)
  toast.info({ message: `已添加: ${major.schoolName}-${major.majorName} (${majors.value.length}/80)` })
}

export function removeMajor(id: string): void {
  if (!majorsSet.has(id)) return
  const i = majors.value.findIndex((major) => major.id === id)
  majors.value.splice(i, 1)
  majorsSet.delete(id)
}

export function clearMajors(): void {
  majorsSet.clear()
  majors.value = []
}

export function save(name: string): void {
  localStorage.setItem('majors-' + name, JSON.stringify(majors.value))
  toast.success({ message: '志愿信息保存成功' })
}

export function load(name: string): void {
  const str = localStorage.getItem('majors-' + name)
  if (!str) {
    toast.info({ message: '没有保存过专业信息' })
    return
  }
  try {
    const data = JSON.parse(str) as IMajor[]
    majors.value = []
    majorsSet.clear()
    for (const major of data) {
      majors.value.push(major)
      majorsSet.add(major.id)
    }
    toast.success({ message: '志愿信息加载成功' })
  } catch (e) {
    toast.error({ message: '发生了错误' })
    localStorage.removeItem('majors-' + name)
  }
}

export function exportXls(): void {
  const first80: Record<string, string>[] = []
  for (let i = 0; i < 80 && i < majors.value.length; i++) {
    const { schoolId, schoolName, majorId, majorName } = toRaw(majors.value[i])
    first80.push({ a: schoolId, b: schoolName, c: majorId, d: majorName })
  }
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(
    [
      //
      { a: '院校代码', b: '院校名称', c: '专业代码', d: '专业名称' },
      ...first80
    ],
    {
      header: ['a', 'b', 'c', 'd'],
      skipHeader: true
    }
  )
  XLSX.utils.book_append_sheet(wb, ws, '志愿导入表')
  XLSX.writeFile(wb, '志愿导入表.xls')
}
