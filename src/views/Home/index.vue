<template>
    <div id="home" p="5">
        <div class="upload-header">
            <input type="file" name="txt-file" accept=".txt" @change='uploadBook' />
        </div>

        <div class="book-history">
            <ul class="novel-list">
                <li class="novel" v-for="book in bookList" v-show="book.bookID" p="5" flex gap-5>
                    <div class="book-cover" max-w-sm py-15 px-xs bg-light b-rd-1 text-white text-sm font-600 text-center>
                        {{ book.name }}
                    </div>
                    <div class="book-meta" text-sm flex="~ col" justify-center>
                        <p v-show="book.name">书名: {{ book.name }}</p>
                        <p py-1 v-show="book.author">作者: {{ book.author }}</p>
                        <p py-1 v-show="book.uploadTime">更新时间: {{ book.uploadTime }}</p>
                        <p v-show="book.size">大小: {{ book.size }} MB</p>
                        <!-- <p v-show="book.bookID">id: {{ book.bookID }}</p> -->
                    </div>

                    <div flex-c>
                        <button text-md px-sm py-xs b-rd-1 bg-active text-white text-sm font-600 cursor="pointer"
                            hover="opacity-90 text-bookbg">阅
                            读</button>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</template>

<script setup lang='ts'>

import { useBook } from '@/hooks/useBook'


const { uploadBook, bookList } = useBook()



</script>

<style scoped lang="less">
.novel {
    border-bottom: 1px solid #ccc;

    .book-cover {
        width: 110px;
        box-shadow: 0px 0px 5px 2px #00000050;
        letter-spacing: .2rem;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;

    }
}


.singe-line {
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
}
</style>