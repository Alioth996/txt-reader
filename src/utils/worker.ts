/**
 *  src/utils/worker.ts
 *
 *  该文件被 web-worker 线程执行, 用于解析小说基本信息与正文内容
 *  做了两件事:
 *    1. 接收主线程传递的 File 类型的文件
 *    2. 解析 File 文件并存入 IndexedDB
 *
 *  IndexedDB:
 *    数据库详情
 *    book => content 存放小说正文
 *    list => list    存放小说信息
 */

export {}

import { BookIF } from '@/types'
import { useIndexedDB } from './db'
import { hashBookName, kBToMB } from './tools'
import { getZJ, chaptersPaser, authorParser } from '@/utils/book'

const { addBook, addBookInfo, getAllBookInfo } = useIndexedDB()
const readBook = (book: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsText(book, 'utf-8')
    reader.onload = _ => {
      if (reader.DONE == 2) {
        resolve(reader.result as string)
      }
    }
    reader.onerror = _ => reject(Error('读取小说出错了'))
  })
}

self.addEventListener('message', async (e: MessageEvent) => {
  const book = e.data as File
  const { name, lastModified, size } = book

  const bookName = name.split('.')[0]

  const bookInfo: BookIF = {
    name: bookName,
    id: hashBookName(bookName),
    size: kBToMB(size),
    uploadTime: new Date(lastModified).toLocaleDateString('zh-cn')
  }

  readBook(book).then(async content => {
    const author = authorParser(content.slice(0, 50))
    const chapterList = await chaptersPaser(content)

    bookInfo.author = author
    await addBook(content, chapterList, bookInfo.id)
    await addBookInfo(bookInfo.id, bookInfo)

    const bookList = await getAllBookInfo()

    self.postMessage(bookList)
  })
})
