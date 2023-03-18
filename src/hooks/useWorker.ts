import Worker from '@/utils/worker.ts?worker'

export const useWorker = () => {
  return new Worker()
}
