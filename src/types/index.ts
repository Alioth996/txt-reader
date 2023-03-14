// ? 书籍接口
export interface BookIF {
  bookID: string
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
