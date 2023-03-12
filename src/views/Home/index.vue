<template>
    <div id="home">
        <div class="upload-header" lg:p-lg>
            <input class="file" type="file" name="txt-file" accept=".txt" @change='uploadBook'>
            <p class="upload-icon" pb-2 text-2xl>+</p>
        </div>
        <div class="book-history">
            <ul class="novel-list" lg:w-full px-sm grid lg:grid-cols-2 grid-cols-1 gap-10>
                <li class="novel" v-for="book in bookList" v-show="book.bookID" py-sm gap-5 w-full grid grid-cols-6>
                    <div class="book-cover" w-full max-w-28 sm:xl-w-200 truncate drop-shadow-lg py-13 px-sm bg-light b-rd-1
                        text-white text-sm font-600 text-center col-span-2>
                        {{ book.name }}
                    </div>

                    <div class="book-meta" text-sm justify-center gap-1 col-span-3>
                        <p v-show="book.name" class="single-line" text-dark font-600 text-md> {{ book.name }}</p>
                        <p py-1 v-show="book.author" text-light>{{ book.author }}</p>
                        <p py-1 v-show="book.uploadTime" text-light>{{ book.uploadTime }}</p>
                        <p v-show="book.size" text-light>{{ book.size }} MB</p>
                    </div>

                    <div flex items-end>
                        <button w-full h-10 text-md py-2 b-rd-1 bg-active text-white text-sm font-400 cursor="pointer"
                            hover="opacity-90 text-bookbg">删除
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
