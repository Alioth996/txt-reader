
<template>
  <!-- 1rem = 4px -->
  <div bg-bookbg wh-full id="reader" p-5 flex flex-col items-center gap="3xl">
    <p>
      <input type="file" name="txt-file" accept=".txt" @change='uploadBook' />
    </p>
    <fieldset p5>
      <legend>书籍信息</legend>
      <div text-light p-y-4>

        <p>书名: {{ BookInfo.name }}</p>
        <p py-1>作者: {{ BookInfo.author ?? '未知' }}</p>
        <p py-1>更新时间: {{ BookInfo.uploadTime }}</p>
        <p>大小: {{ BookInfo.size }}</p>
      </div>

    </fieldset>

    <fieldset p5>
      <legend>目录</legend>
      <h3 text-light p-y-4 text-2xl v-show="BookInfo.name">&lt;&lt; {{ BookInfo.name }} >> 目录</h3>
      <p @click='hideChpaters = !hideChpaters' v-show="BookInfo.name" bg-dark text-white p-2 rd cursor-pointer
        hover="opacity-75 text-active">隐藏目录</p>
      <ul id="chapter-list" v-show="hideChpaters">
        <li v-for="chapter in chapterList" :title="chapter">{{ chapter }}</li>

      </ul>
    </fieldset>

    <fieldset p5>
      <legend>{{ BookInfo.name }}</legend>
      <h2 text-light p-y-4 text-3xl>正文</h2>
      <article text-gray p-8 lg-w-220 sm-w-120 xl-w-200 w-xs py-4 id="txt-body">{{ bookBody }}</article>
    </fieldset>
  </div>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue';
import type { BookIF } from '@/types/index'
import { getZJ } from '@/utils/book';
import { kBToMB } from '@/utils/tools';

// test

const hideChpaters = ref(true)

const BookInfo: BookIF = reactive({
  size: '',
  name: '',
  uploadTime: '',
  bookID: 0
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
    bookBody.value = reader.result as string
    chapterList = getZJ(bookBody.value) as string[]
  }
}



</script>

<style lang="less">
#reader {
  min-height: 100vh;
}

#chapter-list {
  display: flex;
  margin: 0;
  gap: 10px;
  width: 100%;
  padding: 16px;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
  justify-content: center;
}

#chapter-list li {
  /* flex时li的icon会被隐藏 */
  flex: 1;
  color: #2c3e50;
  cursor: pointer;
  min-width: 400px;
  text-align: left;
  padding: 5px 10px;
  border-bottom: 1px dotted #3498db80;

  &:hover {
    color: #2980b9;
  }
}



fieldset {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

#txt-body {
  line-height: 2.4em;
  text-indent: 2em;
  word-spacing: 2px;
  white-space: break-spaces; // 空白直接换行显示
  -moz-only-whitespace: break-spaces;
}
</style>