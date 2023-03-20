// ? 书籍接口
export interface BookIF {
  id: string | number
  name: string
  size: string
  author?: string
  uploadTime: string | number | Date
}

// ? 章节接口
export interface ChapterIF {
  chapterID: number
  chapterName: string
}

export enum BookAction {
  UPLOAD_BOOK = 1, //添加
  DELETE_BOOK = 0 //删除
}
