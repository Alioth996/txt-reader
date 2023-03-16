import Worker from '@/utils/worker.ts?worker'

export const useBookWorker = (book: Blob | File, id: string) => {
  const bookWorker = new Worker()
  bookWorker.postMessage({ book, id })

  onUnmounted(() => bookWorker.terminate())
}
