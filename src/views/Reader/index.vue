<template>
  <!-- todo 移动端正文样式显示有问题 -->
  <section flex-c>
    <article text-dark text-4 p-8 lg-w-220 sm-w-140 xl-w-200 w-screen id="txt-body">{{ bookBody }}</article>
  </section>
  <footer class="menu" flex-c>
    <nav flex-c justify-around bg-bookbg lg-w-220 sm-w-160 xl-w-200 w-screen text-4 text-navColor>
      <div cursor-pointer flex-1 h-12 flex-c @click="openLeftSideChapters">目录</div>
      <div cursor-pointer flex-1 h-12 flex-c>
        <RouterLink text-inherit :to="{ name: 'Home' }">主页</RouterLink>
      </div>
      <div cursor-pointer flex-1 h-12 flex-c @click="toggleTheme">暗黑</div>
      <div cursor-pointer flex-1 h-12 flex-c>设置</div>
    </nav>
  </footer>

  <!-- 侧边目录 -->
  <n-drawer v-model:show="isChapterShow" width="360" placement="left" bg-grayLight>
    <n-drawer-content closable>
      <template #header>
        <span>{{ currentBookName ?? '' }} </span>
        <span p-l-4>目录</span>
      </template>
      <template #default>
        <p v-for="chapter in state.chapterList" p-1 text-gray cursor-pointer text-4 class="chapter"
          hover:text-chapterHover>{{
            chapter }}
        </p>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { debounce } from 'lodash-unified'
import type { BookBodyIF } from '@/types/index'
import { useHead } from '@vueuse/head'
import { useIndexedDB } from '@/utils/db'
import { tr } from 'date-fns/locale';

const { getBook } = useIndexedDB()

let currentBookName = ref()

const route = useRoute()
const isChapterShow = ref(false)

let bookBody = ref('')
let state = reactive<{ chapterList: string[] }>({
  chapterList: []
})


const openLeftSideChapters = debounce(() => {
  isChapterShow.value = true
}, 300)

let flag = true
const toggleTheme = () => {

  nextTick(() => {
    const app: HTMLElement = document.querySelector('#app')!
    const Nav: HTMLElement = document.querySelector('nav')!


    if (flag) {
      app.style.backgroundColor = '#7f8c8d';
      Nav.style.backgroundColor = '#7f8c8d';
      flag = false
    } else {
      app.style.backgroundColor = '#ece6d9';
      Nav.style.backgroundColor = '#ece6d9';
      flag = true

    }

  })


}


onMounted(() => {
  const { bookName, bookId } = route.params
  currentBookName.value = bookName
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

footer.menu {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;

  nav {
    box-shadow: 0px -5px 8px -5px #00000030;
  }

}
</style>
