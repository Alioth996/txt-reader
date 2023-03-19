export function authorParser(book: string): string {
  const authorRegx = /作者[:|\s|\t]?\W{2,7}/s
  // 可选链断言与非空断言
  const author = book
    .match(authorRegx)
    ?.toString()!
    .replace(/\r\n\t/g, '')!
  return author
}

//   正则提取目录列表并返回
export function getZJ(novel: string) {
  const chapterReg =
    /(^\s^\t|\n)?第([0-9零〇一二三四五六气八九十百千万]){1,7}([章节回集卷部])((?! {4}).)((?!\t{1,4}).){0,30}\r?(|\n)/g
  // @ts-ignore
  const chapterList = novel.match(chapterReg)
  return chapterList
}

// 正文分片提取
export function getZW(novel: string) {
  return null
}
/**
 * @description 章节解析器:解析经典小说
 * @param novel string
 * @param chapterRegx RegExp
 * @returns Promise<sting[]>
 * // bug 该方法适用于现代网文,对于金庸等作品(存在章节标识符不一致等问题)为无效提取
 * // 例如: 一 花开花落(有效) 二落花流水(有效,但正文中存在干扰项)
 *
 */
export function chaptersPaser(novel: string, chapterRegx?: RegExp): Promise<string[]> {
  // const 章节正则 = /[^\s^\t^\n]?[零〇一二三四五六七八九十百千万\d]{1,7}[章节卷部回]?[^\t|\s]+(.*)[^\n|^\r]/g  正文提取
  const 章节正则 = /[^\s^\t^\n]?[零〇一二三四五六七八九十百千万\d]{1,7}[章节卷部回]?[\t|\s]+(.*)[^\n|^\r]/g
  let chapterList: RegExpMatchArray | null

  return new Promise<string[]>((reslove, reject) => {
    chapterList = novel.match(章节正则)
    if (chapterList === null) {
      reject(new Error('章节解析失败'))
    }

    reslove(chapterList as RegExpMatchArray)
  })
}
