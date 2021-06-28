import { addMajor, majors } from '@/db'
import { IFilterOptions, filterWith, clearFiltered, exportFiltered, featuresData, filteredData } from '@/db/data'
import toast from '@/plugins/toast'
import { ref } from 'vue'

const init = `/* function filter(item, data) { */
// write function body here
// see also: https://github.com/zisu-dev/zj-gaokao/blob/main/src/db/data.ts#L119

/* } */
`

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useFilter() {
  const enableSchoolFilter = ref(false)
  const school = ref('')
  const u985 = ref(false)
  const u211 = ref(false)
  const features = ref([...new Array(featuresData.length)].map(() => false))
  const enableMajorFilter = ref(false)
  const major = ref('')
  const enableAdvancedFilter = ref(false)
  const filterCode = ref(init)
  function doFilter() {
    const options: IFilterOptions = {}
    if (enableSchoolFilter.value) {
      options.school = school.value
      options.u985 = u985.value
      options.u211 = u211.value
      options.features = features.value
    }
    if (enableMajorFilter.value) {
      options.major = major.value
    }
    if (enableAdvancedFilter.value) options.fn = filterCode.value
    filterWith(options)
  }
  function addAll() {
    let count = 0
    for (const data of filteredData.value) {
      const { schoolId, schoolName, majorId, majorName } = data
      const id = schoolId + '-' + majorId
      if (addMajor({ id, schoolId, schoolName, majorId, majorName }, true)) {
        count++
      }
    }
    toast.info({ message: `已添加${count}个专业 (${majors.value.length}/80)` })
  }
  return {
    enableSchoolFilter,
    school,
    u985,
    u211,
    features,
    enableMajorFilter,
    major,
    enableAdvancedFilter,
    filterCode,
    doFilter,
    clearFiltered,
    exportFiltered,
    addAll
  }
}
