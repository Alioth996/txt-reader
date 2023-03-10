export function authorParser(book: string): string {
  const authorRegx = /(作者).*/g
  const author = book.match(authorRegx)?.toString() as string
  return author
}

//   正则提取目录列表并返回
export function getZJ(novel: string) {
  const chapterReg =
    /(^\s|\n)?(第)([a-zA-Z-0-9零〇一二三四五六气八九十百千万]){1,7}([章节回集卷部])((?! {4}).)((?!\t{1,4}).){0,30}\r?(|\n)/g
  // @ts-ignore

  const chapterList = novel.match(chapterReg)
  return chapterList
}

// 正文分片提取
export function getZW(novel: string) {
  const 正文Reg = /(第[一二三四五六七八九十]{1,7}章)+(.*?)+(第[一二三四五六七八九十]{1,7}章)/gm

  return novel.match(正文Reg)
}
