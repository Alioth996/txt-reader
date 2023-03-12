<template>
    <div id="home" h-full>
        <div class="upload-header" p-3>
            <input type="file" name="txt-file" accept=".txt" @change='uploadBook' />
        </div>

        <div class="book-history">
            <ul class="novel-list" px-sm>
                <li class="novel" v-for="book in bookList" v-show="book.bookID" py-sm flex gap-5 w-full sm-justify-start
                    justify-between>
                    <div class="book-cover" py-13 px-sm bg-light b-rd-1 text-white text-sm font-600 text-center>
                        {{ book.name }}
                    </div>
                    <div class="book-meta" min-w-35 text-sm flex="~ col" justify-center gap-1>
                        <p v-show="book.name" class="single-line" text-dark font-600 text-md> {{ book.name }}</p>
                        <p py-1 v-show="book.author" text-light>{{ book.author }}</p>
                        <p py-1 v-show="book.uploadTime" text-light>{{ book.uploadTime }}</p>
                        <p v-show="book.size" text-light>{{ book.size }} MB</p>
                    </div>

                    <div flex-c>
                        <button text-md px-sm py-xs b-rd-1 bg-active text-white text-sm font-600 cursor="pointer"
                            hover="opacity-90 text-bookbg">阅 读
                        </button>
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
        min-width: 100px;
        width: 100px;
        box-shadow: 0px 0px 5px 2px #00000050;
        letter-spacing: .2rem;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;

    }
}

.single-line {
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: nowrap;
}
</style>