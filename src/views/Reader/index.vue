<template>
  <p>
    <input type="file" name="txt-file" accept=".txt" @change='uploadBook' />
  </p>
  <div bg-bookbg w-full id="reader" p-5 grid grid-cols-6 gap="3xl">
    <fieldset h-200 flex-none col-span-1 min-w-24  md:min-w-36 overflow-y-scroll hidden lg:block>
      <legend>目录</legend>
      <h3 text-light p-y-4 text-sm truncate v-show="BookInfo.name">&lt;&lt; {{ BookInfo.name }} >> 目录</h3>
      <ul>
        <li cursor-pointer  hover:text-red text-xs text-light md:text-sm w-full truncate  v-for="chapter in chapterList" :title="chapter">{{ chapter }}</li>
      </ul>
    </fieldset>
    <div col-span-6 lg:col-span-5  h-full>
      <fieldset p5>
        <legend>书籍信息</legend>
        <div text-light p-y-4>
          <p>{{ BookInfo.name }}</p>
          <p py-1>{{ BookInfo.author ?? '未知' }}</p>
          <p py-1> {{ BookInfo.uploadTime }}</p>
          <p> {{ BookInfo.size }}</p>
        </div>
      </fieldset>

      <fieldset p5 overflow-y-auto h-165 flex-col items-center justify-center>
        <legend>{{ BookInfo.name }}</legend>
        <h2 text-light>正文</h2>
        <div flex justify-center items-center >
          <article text-gray p-4 xl-w-200 flex items-center px-2 text-base leading-8 id="txt-body">{{ bookBody }}</article>
        </div>

      </fieldset>
    </div>

  </div>

</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue';
import type { BookIF } from '@/types/index'
import { authorParser, getZJ } from '@/utils/book';
import { kBToMB } from '@/utils/tools';

const BookInfo: BookIF = reactive({
  size: '',
  name: '',
  uploadTime: '',
  bookID: ''
})

const bookBody = ref('')
let chapterList: string[] = reactive([])



const uploadBook = (e: Event) => {
  const files = (<HTMLInputElement>e.target).files as FileList;
  const txtNovel = files?.[0]
  if (!txtNovel) return

  const { size, name, lastModified } = txtNovel

  BookInfo.name = name.split('.')[0]  // =>['bookname','txt']
  BookInfo.size = kBToMB(size) + 'MB'
  BookInfo.uploadTime = new Date(lastModified).toLocaleDateString('zh-cn')

  getBookBody(txtNovel)

}

// 获取正文  todo:使用 web-worker开启后台线程解析小说
function getBookBody(book: Blob) {

  const reader = new FileReader()
  reader.readAsText(book)

  reader.onload = e => {

    const fullBook = reader.result as string
    let author = authorParser(fullBook)


    BookInfo.author = author

    bookBody.value = fullBook
    chapterList = getZJ(bookBody.value) as string[]

  }
}




</script>

<style lang="less">
#txt-body {
  line-height: 2.4em;
  text-indent: 2em;
  word-spacing: 2px;
  white-space: break-spaces; // 空白直接换行显示
  -moz-only-whitespace: break-spaces;
}
</style>
