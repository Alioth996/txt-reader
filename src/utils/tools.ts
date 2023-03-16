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

export function hashBookName(bookName: string) {
  let hash = 0
  let i
  let chr

  if (bookName.length === 0) return hash
  for (i = 0; i < bookName.length; i++) {
    chr = bookName.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }
  return Math.abs(hash)
}
