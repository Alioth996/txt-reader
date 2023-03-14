import uniqueId from 'lodash/uniqueId'

export function kBToMB(kb: number) {
  return (kb / (1024 * 1024)).toFixed(2)
}

/**
 * @param time 时间 | 时间戳
 * @returns {string} time 本地格式化时间
 */
export function parseTime(time: string | number | Date): string {
  return new Date(time).toLocaleDateString('zh-cn')
}

export function getBookId() {
  return uniqueId()
}
