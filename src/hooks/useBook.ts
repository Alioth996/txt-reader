import type { BookIF } from '@/types/index'
import { getBookId, kBToMB, parseTime } from '@/utils/tools'
import { useBookWorker } from '@/hooks/useWorker'

let timer: any

// 全局共享变量,不需要每次都初始化
const state = reactive<{ bookList: BookIF[] }>({
  bookList: []
})

export const useBook = () => {
  let novel: BookIF = {
    size: '',
    name: '',
    uploadTime: '',
    bookID: ''
  }

  // 查找小说是否存在
  const existBook = (bookName: string): Boolean => {
    // isBook === -1 表示小说不存在 return ture
    const isBook = state.bookList.findIndex(x => x.name == bookName)
    return isBook === -1
  }

  const addBook = (book: BookIF) => {
    clearTimeout(timer)
    const isBook = existBook(book.name)
    switch (isBook) {
      case false:
        // !bug: 连续选择导入两次相同文件不触发
        console.log(`--系统提示--: 小说: ${book.name} 已存在`)
        break
      case true:
        state.bookList.unshift(book)

        // 2秒之后再存入,可能会连续导入小说
        timer = setTimeout(() => {
          localStorage.setItem('list', JSON.stringify(state.bookList))
          clearTimeout(timer)
        }, 2 * 1000)

        console.log(`--系统提示--: 小说 ${book.name} 已导入`)
    }
  }

  const deleteBook = (bookID: string) => {
    const bookIndex = state.bookList.findIndex(x => x.bookID == bookID)

    if (bookIndex == -1) {
      console.error(`sys-error: 小说不存在!!`)
      return
    }
    state.bookList.splice(bookIndex, 1)
    localStorage.setItem('list', JSON.stringify(state.bookList))
    console.log(`--系统提示--: 小说 ${bookID} 已删除!`)
  }

  const uploadBook = (e: Event) => {
    const fileList = (e.target as HTMLInputElement)?.files as FileList
    const txtNovel = fileList[0]
    if (!txtNovel) return

    // todo web worker解析目录与正文
    // 开启一个后台线程

    const { size, name, lastModified } = txtNovel
    novel = {
      size: kBToMB(size),
      name: name?.split('.')[0],
      uploadTime: parseTime(lastModified),
      bookID: getBookId()
    }

    useBookWorker(txtNovel, novel.bookID)

    addBook(novel)
  }

  onUnmounted(() => {
    clearTimeout(timer)
    timer = null
  })

  return {
    state,
    uploadBook,
    deleteBook
  }
}
