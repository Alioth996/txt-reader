/**
 * thread: bookWorker
 * @desc 解析小说目录, 正文的线程
 * 1. 连接 IndexedDB数据库
 * 2. FileReader 读取正文
 * 3. 存入数据库
 * 4.
 */

export {}

const readBook = (book: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(book)
    reader.onload = _ => {
      if (reader.DONE == 2) {
        resolve(reader.result as string)
      }
    }

    reader.onerror = _ => reject(Error('读取小说出错了'))
  })
}

self.addEventListener('message', e => {
  const book = e.data
  console.log(book)

  readBook(book).then(res => console.log(res))
})
