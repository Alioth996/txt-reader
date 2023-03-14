<template>
  <HeaderNav>
    <template v-slot:home>
      <div class="upload-header relative " lg:p-lg>
        <input type="file" class="block cursor-pointer w-full text-sm text-slate-500 opacity-0 absolute
          file:mr-4 file:py-2 file:px-4
          file:rounded-sm file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          file:max-w-[80px] file:truncate
          hover:file:bg-violet-100
        " @change='uploadBook' />
        <p class="upload-text">上传</p>
      </div>
    </template>
  </HeaderNav>

  <div class="w-full lg:w-3/4 m-auto p-4 lg:p-10">
    <ul role="list" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <li v-for="book in state.bookList" :key="book.bookID" class="col-span-1 flex flex-col divide-y divide-gray-200 text-center pb-4">
        <div class="flex flex-1">
          <div @click="toReaderBook(<string>book.bookID, book.name)" class="bg-[#ece6d9] hover:text-lg cursor-pointer min-w-[120px] h-[200px] flex items-center justify-center shadow-md">
            <div class="w-full max-w-[120px] px-2 truncate">{{ book.name }}</div>
          </div>
          <div class="relative ml-2 lg:ml-4 w-full border-hidden">
            <div class="text-start pr-2 text-[#71717a]">
                <p class="py-1">书名：{{ book.name }}</p>
                <p class="py-1">作者：{{ book.author ?? '未知' }}</p>
                <p class="py-1">创建时间： {{ book.uploadTime }}</p>
                <p>大小： {{ book.size }}</p>
            </div>
            <div class="absolute bottom-4 right-6 bg-red-200">
              <button @click="removeBook(book.bookID as string, book.name)" type="button" class="rounded bg-white py-2 px-6 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset text-[#71717a] ring-gray-300 hover:bg-gray-50">删除</button>
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
.upload-header{
        position: relative;
        background: #74787a;
        padding: 2px 6px;
        color: #fff;
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
      }
</style>
