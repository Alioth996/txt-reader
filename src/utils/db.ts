import { get, set, del, createStore, values } from 'idb-keyval'

type BookIDT = number | string

export const useIndexedDB = () => {
  const BookBody = createStore('book', 'content')
  const BookList = createStore('list', 'bookInfo')

  // 添加正文
  const addBook = async (book: string, chapterList: Array<string>, bookId: BookIDT) => {
    await set(bookId, { content: book, chapters: chapterList }, BookBody)
  }

  // 删除一本小说
  const removeBook = async (bookId: BookIDT) => {
    await del(bookId, BookBody)
    await del(bookId, BookList)
  }

  // 添加一本小说信息
  const addBookInfo = async (bookId: BookIDT, bookInfo: any) => {
    await set(bookId, bookInfo, BookList)
  }

  // 获取小说正文
  const getBook = async (bookId: BookIDT) => {
    return await get(bookId, BookBody)
  }

  // 获取所有小说列表
  const getAllBookInfo = async <T>(): Promise<T[]> => {
    return await values(BookList)
  }

  return {
    addBook,
    addBookInfo,
    removeBook,
    getBook,
    getAllBookInfo
  }
}
