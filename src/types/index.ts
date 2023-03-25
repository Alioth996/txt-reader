import { type } from 'os'

// ? 小说信息接口
export interface BookIF {
  id: number
  name: string
  size: string
  author?: string
  uploadTime: string | number | Date
}

// ? 小说章节接口
export interface ChapterIF {
  chapterID: number
  chapterName: string
}

// ?  action枚举
export enum Action {
  UPLOAD_BOOK = 1, //添加
  DELETE_BOOK = 0 //删除
}

// ?小说内容接口
export interface BookBodyIF {
  content: string
  chapters: string[]
}

export type getAllBooksT = <T>() => Promise<T[]>
