export {}

/**
 * @description 传入Blob或File文件,解析正文并返回
 * @param book Blob/File    用户上传的txt文件(Blob/File文件)
 * @returns Promise<string> 小说正文
 */

import { addBook } from './db'

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

self.addEventListener('message', async e => {
  const { book, id } = e.data

  readBook(book).then(content => {
    addBook(content, id)
  })
})
