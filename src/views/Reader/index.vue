<template>
  <div id="reader">

    {{ route.params.bookId }}


  </div>
</template>

<script setup lang='ts'>

import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import type { BookIF } from '@/types/index'
import { authorParser, getZJ } from '@/utils/book';


const route = useRoute()


// 根据id查找小说信息
const findBookInDb = () => {

}


onMounted(() => {
  const { bookName, bookId } = route.params
  document.title = `${bookName} - 文曲阅读`
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
</style>
