import toast from '@/plugins/toast'
import { wait } from '@/utils/async'
import { u211, u985 } from '@/db/misc'
import { ref, toRaw } from 'vue'
import XLSX from 'xlsx'

export const dataColumns = {
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

// 院校代码	院校名称	专业代码	专业名称	学制	省	城市	本专科	计划数	选考科目要求	收费标准	备注
export interface IMajorData {
  schoolId: string
  schoolName: string
  majorId: string
  majorName: string
  schema: string
  province: string
  city: string
  trash: string
  count: string
  requirement: string
  charge: string
  remark: string
}

export const majorsData = ref<IMajorData[]>([])
export const filteredData = ref<IMajorData[]>([])
export const featuresData = [
  '一流大学建设高校',
  '一流学科建设高校',
  '省重点建设高校',
  '入选“2011计划”高校',
  '省市共建重点高校',
  '民办',
  '中外合作办学',
  '内地与港澳台地区合作办学'
]

const V = '0.3.0'

// Load data
;(function () {
  const str = localStorage.getItem('majorsData')
  if (!str) return
  try {
    const result = JSON.parse(str)
    if (result._v !== V) throw new Error('Version mismatch')
    majorsData.value = result.majors
  } catch (e) {
    localStorage.removeItem('majorsData')
  }
})()

function saveData() {
  const data = {
    _v: V,
    majors: majorsData.value
  }
  localStorage.setItem('majorsData', JSON.stringify(data))
}

function readFile(file: File) {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => {
      resolve(fr.result as ArrayBuffer)
    }
    fr.onerror = reject
    fr.readAsArrayBuffer(file)
  })
}

export async function loadDb(file: File): Promise<void> {
  toast.info({ message: '开始处理数据，将卡顿约数秒' })
  await wait(500)
  const buffer = await readFile(file)
  const data = new Uint8Array(buffer)
  const wb = XLSX.read(data, { type: 'array' })
  const ws = wb.Sheets[wb.SheetNames[0]]
  const obj = XLSX.utils.sheet_to_json(ws, { header: 1 }) as string[][]
  majorsData.value = []
  for (let i = 2; i < obj.length; i++) {
    majorsData.value.push({
      schoolId: obj[i][1],
      schoolName: obj[i][2],
      majorId: obj[i][3],
      majorName: obj[i][4],
      schema: obj[i][5],
      province: obj[i][6],
      city: obj[i][7],
      trash: obj[i][8],
      count: obj[i][9],
      requirement: obj[i][10],
      charge: obj[i][11],
      remark: obj[i][12]
    })
  }
  saveData()
  toast.success({ message: '处理成功' })
}

export function clearFiltered(): void {
  filteredData.value = []
}

export interface IFilterOptions {
  school?: string
  u985?: boolean
  u211?: boolean
  features?: boolean[]
  major?: string
  fn?: string
}

const data = {
  u985,
  u211
}

export function filterWith(options: IFilterOptions): void {
  const { fn } = options
  const school = options.school?.split(',').map((x) => x.trim())
  const major = options.major?.split(',').map((x) => x.trim())
  // eslint-disable-next-line @typescript-eslint/ban-types
  let customFilter: Function | undefined
  if (fn) customFilter = new Function('item, data', fn)
  const filter = (item: IMajorData) => {
    if (school && !school.some((x) => item.schoolName.includes(x))) return false
    if (major && !major.some((x) => item.majorName.includes(x) || item.remark.includes(x))) return false
    if (customFilter && !customFilter(item, data)) return false
    return true
  }
  toast.info({ message: '开始筛选，将卡顿约数秒' })
  filteredData.value = majorsData.value.filter(filter)
  if (options.u985) {
    filteredData.value = filteredData.value.filter((x) => u985.some((y) => x.schoolName.includes(y)))
  }
  if (options.u211) {
    filteredData.value = filteredData.value.filter((x) => u211.some((y) => x.schoolName.includes(y)))
  }
  if (options.features) {
    for (let i = 0; i < featuresData.length; i++) {
      if (!options.features[i]) continue
      filteredData.value = filteredData.value.filter((x) => x.schoolName.includes(featuresData[i]))
    }
  }
  toast.success({ message: `筛选出了${filteredData.value.length}条记录` })
}

function parseFuckedNumber(str: string) {
  if (/[0-9]+/.test(str)) return parseInt(str)
  if (/免学?费/.test(str)) return 0
  if (str.endsWith('万')) return Math.floor(10000 * parseFloat(str.substr(0, str.length - 1)))
  return -1 // 见备注
}

function convertMajorDataToRow(item: IMajorData) {
  return Object.assign({ 0: '待选' }, item, {
    count: parseInt(item.count),
    charge: parseFuckedNumber(item.charge)
  })
}

export function exportFiltered(): void {
  const wb = XLSX.utils.book_new()
  const header = Object.assign({ 0: '预选志愿序号' }, dataColumns)
  const keys = Object.keys(header)
  const ws = XLSX.utils.json_to_sheet(
    [
      //
      header,
      ...filteredData.value.map((x) => convertMajorDataToRow(toRaw(x)))
    ],
    {
      header: keys,
      skipHeader: true
    }
  )
  XLSX.utils.book_append_sheet(wb, ws, '筛选结果')
  XLSX.writeFile(wb, '筛选结果导出.xlsx')
}
