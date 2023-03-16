import { get, set, del, createStore, values } from 'idb-keyval'

const BookBody = createStore('book', 'content')
const BookList = createStore('list', 'test')

// 添加正文
export const addBook = async (book: string, id: number | string) => {
  await set(id, book, BookBody)
}

export const removeBook = async (bookId: number | string) => {
  await del(bookId, BookBody)
  await del(bookId, BookList)
}

export const getBook = async (bookId: number | string) => {
  await get(bookId, BookBody)
}

// 添加一本小说信息
export const addBookInfo = async (bookId: string | number, bookInfo: any) => {
  await set(bookId, bookInfo, BookList)
}
// 获取所有小说列表
export const getAllBookInfo = <T>(): Promise<T[]> => {
  return values(BookList)
}
