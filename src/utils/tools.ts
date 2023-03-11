export function kBToMB(kb: number) {
  return (kb / (1024 * 1024)).toFixed(2)
}

export function parseTime(time: string | number | Date) {
  return new Date(time).toLocaleDateString('zh-cn')
}

export function getBookId() {
  if (crypto) {
    return crypto.randomUUID()
  }
}
