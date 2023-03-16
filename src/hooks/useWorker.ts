import Worker from '@/utils/worker.ts?worker'

export const useBookWorker = () => {
  const bookWorker = new Worker()
  return {
    bookWorker
  }
}
