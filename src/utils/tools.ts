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

/**
 *
 * *********************************
 * UUID 是通用唯一识别码（Universally Unique Identifier）的缩写
 * *********************************
 *
 * **********************************
 * crypto 接口提供了当前上下文中可用的基本的加密功能
 * ! 该比较新,部分浏览器无法使用(移动端)
 * @mdn https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto
 * **********************************
 *
 * @description 使用crypto或者自定义生成
 * @returns {string} uuid 生成的uuid
 * @author Alioth996
 * @date 2023/3/12
 */

export function getBookId() {
  if (typeof crypto === 'object') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
    if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
      const callback = (c: any) => {
        const num = Number(c)
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16)
      }
      return `[1e7] + -1e3 + -4e3 + -8e3 + -1e11`.replace(/[018]/g, callback)
    }
  }
  let timestamp = new Date().getTime()
  let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let random = Math.random() * 16
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0
      timestamp = Math.floor(timestamp / 16)
    } else {
      random = (perforNow + random) % 16 | 0
      perforNow = Math.floor(perforNow / 16)
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16)
  })
}
