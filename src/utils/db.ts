import { get, set, del, createStore } from 'idb-keyval'

const BookDB = createStore('book', 'content')

export const addBook = async (book: string, id: string) => {
  await set(id, book, BookDB)
}

export const removeBook = async (bookId: string) => {
  await del(bookId, BookDB)
}

export const fetchBook = async (bookID: string) => {
  await get(bookID, BookDB)
}
