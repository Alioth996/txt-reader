<template>
  <HeaderNav>
    <template v-slot:home>
      <div class="upload-header" lg:p-lg>
        <input type="file" class="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
        " @change='uploadBook' />
      </div>
    </template>
  </HeaderNav>
  <div id="home">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li v-for="book in state.bookList" :key="book.bookID" class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
        <div class="flex flex-1 flex-col p-8">
          <img class="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
          <h3 class="mt-6 text-sm font-medium text-gray-900">{{ book.name }}</h3>
          <dl class="mt-1 flex flex-grow flex-col justify-between">
            <dt class="sr-only">uploadTime</dt>
            <dd class="text-sm text-gray-500">{{ book.uploadTime }}</dd>
            <dt class="sr-only">size</dt>
            <dd class="text-sm text-gray-500">{{ book.size }} MB</dd>
            <dt class="sr-only">author</dt>
            <dd class="mt-3">
              <span class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">{{ book.author ? ' book.author': 'admin' }}</span>
            </dd>
          </dl>
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div @click="toReaderBook(<string>book.bookID, book.name)" class="flex w-0 flex-1">
              <div class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                查看
              </div>
            </div>
            <div class="-ml-px flex w-0 flex-1">
              <a @click="removeBook(book.bookID as string, book.name)" href="tel:+1-202-555-0170" class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                删除
              </a>
            </div>
          </div>
        </div>
      </li>

      <!-- More people... -->
    </ul>

  </div>
</template>

<script setup lang='ts'>

import HeaderNav from '@/compoments/hearder.vue'
import { useRouter } from 'vue-router';
import deleteIcon from '@/assets/delete-red.svg'
import { useBook } from '@/hooks/useBook'

const router = useRouter()

const { uploadBook, state, deleteBook } = useBook()

onMounted(() => {
    const list = <Array<any>>JSON.parse(localStorage.getItem('list') as string)
    if (list != null) {
        state.bookList = list
    }




})
const removeBook = (bookId: string, bookName: string) => {
    if (!confirm(`删除小说 ${bookName} ?`)) return

  deleteBook(bookId)

}


const toReaderBook = (bookId: string, bookName: string) => {
    router.push({
        name: 'reader',
        params: {
            bookName, bookId
        }
    })

}

</script>

<style scoped lang="less">
#home {
  width: 80%;
  margin: 0 auto;
  padding: 10px 10px;
  min-height: 100vh;

  // portrait 竖屏
  @media screen and (orientation: portrait) {
    width: 100%;
  }

  .upload-header {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    background: #74787a;
    margin: 20px 0;
    border-radius: 4px;
    padding: 10px 60px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    cursor: pointer;
    text-align: center;

    input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
    }

    &:hover {
      background: #2b333e;
      text-decoration: none;
      cursor: pointer;
    }
  }

}

.novel {
  border-bottom: 1px solid #ccc;
}

.single-line {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
}

.novel-list {
  @media screen and (orientation: portrait) {
    width: 100%;
  }
}
</style>
