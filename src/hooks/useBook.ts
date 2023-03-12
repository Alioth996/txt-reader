import { ref, reactive } from 'vue'
import type { BookIF } from '@/types/index'
import { authorParser } from '@/utils/book'
import { getBookId, kBToMB, parseTime } from '@/utils/tools'

export const useBook = () => {
  const bookList: BookIF[] = reactive([])

  let novel: BookIF = {
    size: '',
    name: '',
    uploadTime: '',
    bookID: 0
  }

  const addBook = (book: BookIF) => {
    if (bookList.length == 0) {
      bookList.unshift(book)
      console.log(`--系统提示--: 小说: ${book.name} 已导入`)
      return
    }

    // isBook 等于 -1表示该小说不存在 可以添加
    const isBook = bookList.findIndex(x => x.name == book.name)

    // switch-case 高级用法 匹配运算符
    switch (Boolean(true)) {
      case isBook != -1:
        console.log(`--系统提示--: 小说: ${book.name} 已存在`)
        break
      case isBook == -1:
        bookList.unshift(book)
        console.log(`--系统提示--: 小说: ${book.name} 已导入`)
    }
  }

  const uploadBook = (e: Event) => {
    const fileList = (e.target as HTMLInputElement)?.files as FileList
    const txtNovel = fileList[0]
    if (!txtNovel) return

    const { size, name, lastModified } = txtNovel

    novel = {
      size: kBToMB(size),
      name: name?.split('.')[0],
      uploadTime: parseTime(lastModified),
      bookID: getBookId()
    }

    addBook(novel)
  }

  return {
    uploadBook,
    bookList
  }
}
