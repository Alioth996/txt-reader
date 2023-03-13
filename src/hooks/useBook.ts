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
    bookID: ''
  }

  // 查找小说是否存在
  const existBook = (bookName: string): Boolean => {
    // isBook === -1 表示小说不存在
    const isBook = bookList.findIndex(x => x.name == bookName)
    return isBook === -1
  }

  const addBook = (book: BookIF) => {
    // isBook 等于 -1表示该小说不存在 可以添加
    const isBook = bookList.findIndex(x => x.name == book.name)

    // switch-case 高级用法 匹配运算符
    switch (true) {
      case isBook != -1:
        // !bug: 连续选择导入两次相同文件不触发
        console.log(`--系统提示--: 小说: ${book.name} 已存在`)
        break
      case isBook == -1:
        bookList.unshift(book)
        console.log(`--系统提示--: 小说: ${book.name} 已导入`)
    }
  }

  const deleteBook = async (bookID: string) => {
    const bookIndex = bookList.findIndex(x => x.bookID == bookID)

    if (bookIndex == -1) {
      console.error(`sys-error: 小说不存在!!`)
      return
    }
    try {
      bookList.splice(bookIndex, 1)
      console.log(`sys-小说: ${bookID} 已删除!`)
    } catch (error) {
      console.error(error)
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
    bookList,
    uploadBook,
    deleteBook
  }
}
