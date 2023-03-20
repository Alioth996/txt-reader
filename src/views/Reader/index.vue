<template>
  <!-- 侧边目录 -->
  <n-drawer v-model:show="isChapterShow" width="360" placement="left" :show-mask="false" bg-grayLight>
    <n-drawer-content title="目录">
      <template #default>
        <p v-for="chapter in state.chapterList" p-1 text-gray cursor-pointer text-4 class="chapter">{{ chapter }}
        </p>
      </template>
    </n-drawer-content>
  </n-drawer>

  <!-- todo 移动端正文样式显示有问题 -->
  <div class=" py-32 px-6 lg:px-8 grid lg:grid-cols-5 xl:grid-cols-7 2xl:px-[200px]">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700 lg:col-span-4 xl:col-span-5">
      <div class="mt-10 max-w-2xl">
        <h2 text-light>正文</h2>
        <article text-gray p-2 w-md flex items-center px-2 text-base leading-6 id="txt-body">{{ bookBody }}
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import type { BookBodyIF } from '@/types/index'
import { useHead } from '@vueuse/head'
import { useIndexedDB } from '@/utils/db'

const { getBook } = useIndexedDB()


const route = useRoute()
const isChapterShow = ref(true)

let bookBody = ref('')
let state = reactive<{ chapterList: string[] }>({
  chapterList: []
})

onMounted(() => {
  const { bookName, bookId } = route.params
  useHead({
    title: bookName + '-文曲阅读',
  })

  getBook(Number(bookId)).then((res: BookBodyIF) => {
    const { content, chapters } = res
    bookBody.value = content
    state.chapterList = chapters

  })
})










</script>

<style lang="less">
#txt-body {
  line-height: 2.4em;
  text-indent: 2em;
  word-spacing: 2px;
  white-space: break-spaces; // 空白直接换行显示
  -moz-only-whitespace: break-spaces;

}

.chapter {
  border-bottom: 1px dotted #2c3e50;
}
</style>
