<template>
    <div id="home">
        <div class="upload-header">
            <input type="file" name="txt-file" accept=".txt" @change='uploadBook' />
        </div>

        <ul class="novel-list">

            <li class="novel" v-for="book in bookList" v-show="book.bookID" p="5">
                <div class="book-cover">
                    {{ book.name }}
                </div>
                <div class="book-meta">
                    <p v-show="book.name">书名: {{ book.name }}</p>
                    <p py-1 v-show="book.author">作者: {{ book.author }}</p>
                    <p py-1 v-show="book.uploadTime">更新时间: {{ book.uploadTime }}</p>
                    <p v-show="book.size">大小: {{ book.size }} MB</p>
                    <p v-show="book.bookID">id: {{ book.bookID }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts'>

import { useBook } from '@/hooks/useBook'


const { uploadBook, bookList } = useBook()



</script>

<style scoped lang="less">
.novel {
    border-bottom: 1px solid #ccc;
}
</style>