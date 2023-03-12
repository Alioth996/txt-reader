<template>
    <div id="home">
        <div class="upload-header">
            <input class="file" type="file" name="txt-file" accept=".txt" @change='uploadBook'>
            <p class="upload-icon">+</p>
            <p class="upload-text">上传txt文件</p>
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
                            hover="opacity-90 text-bookbg">阅读</button>
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
#home{
    width: 60%;
    margin: 0 auto;
    padding: 0 10px;
    // portrait 竖屏
    @media screen and (orientation: portrait) {
        width: 100%;
    }
    .upload-header{
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
        .upload-icon{
            font-size: 50px;
        }
        .upload-text{
            padding-top: 20px;
        }
    }
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
}
</style>
