import { IFilterOptions, filterWith, clearFiltered, exportFiltered } from '@/db/data'
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
    }
    if (enableMajorFilter.value) {
      options.major = major.value
    }
    if (enableAdvancedFilter.value) options.fn = filterCode.value
    filterWith(options)
  }
  return {
    enableSchoolFilter,
    school,
    u985,
    u211,
    enableMajorFilter,
    major,
    enableAdvancedFilter,
    filterCode,
    doFilter,
    clearFiltered,
    exportFiltered
  }
}
