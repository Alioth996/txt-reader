import { ref, reactive } from 'vue'
import type { BookIF } from '@/types/index'

import { authorParser } from '@/utils/book'

export default function useBook(book: Blob) {
  const BookInfo: BookIF = reactive({
    size: '',
    name: '',
    uploadTime: '',
    bookID: crypto.randomUUID()
  })

  return {
    BookInfo
  }
}
