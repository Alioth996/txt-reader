export interface BookIF {
  bookID: number
  name: string
  size: string
  author?: string
  uploadTime: string | number | Date
}

export interface ChapterIF {
  chapterID: number
  chapterName: string
}
