<template>
  <!-- todo 为底部tabbar -->
  <HeaderNav></HeaderNav>

  <div v-show="nodelist" class="relative z-10" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    <div class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div class="pointer-events-auto relative w-96">
            <div class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
              <button @click="nodelist = !nodelist" type="button"
                class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                <span class="sr-only">Close panel</span>
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="h-full overflow-y-auto bg-white">
              <NodeLists :listDatas="chapterList" class="space-y-6 pb-16"></NodeLists>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="bg-white py-32 px-6 lg:px-8 grid lg:grid-cols-5 xl:grid-cols-7 2xl:px-[200px]">
    <div class="col-span-1 hidden lg:block xl:col-span-2">
      <NodeLists :listDatas="chapterList"></NodeLists>
    </div>
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700 lg:col-span-4 xl:col-span-5">
      <div class="lg:hidden">
        <svg @click="nodelist = !nodelist" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        </svg>
      </div>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ BookInfo.name }}</h1>
      <figcaption class="mt-6 flex gap-x-4">
        <img class="h-6 w-6 flex-none rounded-full bg-gray-50"
          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="">
        <div class="text-sm leading-6"><strong class="font-semibold text-gray-900">Maria Hill</strong> – Marketing Manager
        </div>
      </figcaption>
      <p class="text-base font-semibold leading-7 text-indigo-600 mt-10 pb-2">书籍信息</p>
      <figure class="border-l border-indigo-600 pl-9">
        <blockquote class="font-semibold text-gray-900">
          <div text-light p-y-4>
            <p>书名：{{ BookInfo.name }}</p>
            <p py-1>作者：{{ BookInfo.author ?? '未知' }}</p>
            <p py-1>创建时间： {{ BookInfo.uploadTime }}</p>
            <p>大小： {{ BookInfo.size }}</p>
          </div>
        </blockquote>
      </figure>
      <figure class="mt-16">
        <img class="aspect-video rounded-xl bg-gray-50 object-cover"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
          alt="">
        <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
          <svg class="mt-0.5 h-5 w-5 flex-none text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clip-rule="evenodd" />
          </svg>
          Faucibus commodo massa rhoncus, volutpat.
        </figcaption>
      </figure>

      <p class="mt-6 text-xl leading-8">描述：Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit
        dui mi, nibh dui, diam eget aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra
        scelerisque eget. Eleifend egestas fringilla sapien.</p>
      <div class="mt-10 max-w-2xl">
        <h2 text-light>正文</h2>
        <div>
          <article text-gray p-2 xl-w-200 flex items-center px-2 text-base leading-6 id="txt-body">{{ bookBody }}
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import type { BookIF } from '@/types/index'
import HeaderNav from '@/components/hearder.vue'
import NodeLists from '@/components/nodeList.vue'

const route = useRoute()


onBeforeMount(() => {
  const readerTitle = route.params.bookName as string + '-文曲阅读'
  useHead({
    title: readerTitle,
  })
})



const BookInfo = reactive<BookIF>({
  id: '',
  author: '',
  size: '',
  name: '',
  uploadTime: ''
})

let nodelist = ref(false)
const bookBody = ref('')
let chapterList: string[] = reactive([])




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
