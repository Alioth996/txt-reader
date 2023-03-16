import Worker from '@/utils/worker.ts?worker'

export const useBookWorker = (book: Blob) => {
  const bookWorker = new Worker()
  bookWorker.postMessage(book)

  onUnmounted(() => bookWorker.terminate())
}
