<template>
  <div id="home">
    <div class="upload-header" lg:p-lg>
      <input class="file" type="file" name="txt-file" accept=".txt" @change='uploadBook'>
      <p class="upload-icon" pb-2 text-2xl>+</p>
    </div>

    <div class="book-history">
      <ul class="novel-list" lg:w-full px-sm grid lg:grid-cols-2 grid-cols-1 gap-10>
        <book-item v-for="book in state.bookList" :key="book.id" :book="book" @del-book="updateBookAfterDel" />
      </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useWorker } from '@/hooks/useWorker';
import bookItem from './components/bookItem.vue'
import type { BookIF } from '@/types';
import { useIndexedDB } from '@/utils/db';


/**
 *  ! vite-ssg两个大坑
 *  !Worker与IndexedDB都是Window的属性, Vue渲染生命周期才能获取到
 */

// vite-ssg build: 三者皆为not defined 打包失败
// console.log(window, indexedDB, Worker);


let bookWorker: Worker

const state = reactive<{ bookList: BookIF[] }>({
  bookList: []
})




const uploadBook = (e: Event) => {
  const files = (e.target as HTMLInputElement)?.files as FileList
  const txtNovel = files[0]
  if (!txtNovel) return

  bookWorker.postMessage(txtNovel)
}


const updateBookAfterDel = async (books: BookIF[]) => {

  state.bookList = books
}

onMounted(async () => {
  bookWorker = useWorker()

  bookWorker.addEventListener('message', e => {
    state.bookList = e.data as BookIF[]
  })

  const { getAllBookInfo } = useIndexedDB()


  const infoList = await getAllBookInfo<BookIF>()
  state.bookList = infoList

  bookWorker.addEventListener('error', e => {
    console.log(e.lineno);
    console.log(e.filename);
    console.log(e.message);

  })






})


onUnmounted(() => {
  // 页面卸载之前关闭线程
  bookWorker.terminate()
})





</script>

<style scoped lang="less">
#home {
  width: 80%;
  margin: 0 auto;
  padding: 0 10px;
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
