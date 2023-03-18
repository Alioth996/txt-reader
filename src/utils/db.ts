import { get, set, del, createStore, values } from 'idb-keyval'

type BookIDT = number | string

export const useIndexedDB = () => {
  const BookBody = createStore('book', 'content')
  const BookList = createStore('list', 'bookInfo')

  // 添加正文
  const addBook = async (book: string, bookId: BookIDT) => {
    await set(bookId, book, BookBody)
  }

  // 删除一本小说
  const removeBook = async (bookId: BookIDT) => {
    await del(bookId, BookBody)
    await del(bookId, BookList)
  }

  // 获取小说正文
  const getBook = async (bookId: BookIDT) => {
    await get(bookId, BookBody)
  }

  // 添加一本小说信息
  const addBookInfo = async (bookId: BookIDT, bookInfo: any) => {
    await set(bookId, bookInfo, BookList)
  }
  // 获取所有小说列表
  const getAllBookInfo = <T>(): Promise<T[]> => {
    return values(BookList)
  }

  return {
    addBook,
    addBookInfo,
    removeBook,
    getBook,
    getAllBookInfo
  }
}
