<template>
    <div id="home">
        <div class="upload-header">
            <input type="file" name="txt-file" accept=".txt" @change='uploadBook' />
        </div>

        <ul class="novel-list">
            <li class="novel" v-for="novel in novelList">
                <p>书名: {{ novel.name }}</p>
                <p py-1>作者: {{ novel.author ?? '未知' }}</p>
                <p py-1>更新时间: {{ novel.uploadTime }}</p>
                <p>大小: {{ novel.size }}</p>
                {{ novel.bookID }}
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts'>

import { BookIF } from '@/types';
import { reactive, toRefs, ref } from 'vue';
import { kBToMB, parseTime, getBookId } from '@/utils/tools'

const novelList: BookIF[] = reactive([])



const uploadBook = (e: Event) => {
    const fileList = (e.target as HTMLInputElement)?.files as FileList
    const txtNovel = fileList[0]
    if (!txtNovel) return
    const { size, name, lastModified } = txtNovel

    const novel: BookIF = {
        size: kBToMB(size),
        name,
        uploadTime: parseTime(lastModified),
        bookID: getBookId()
    }

    novelList.push(novel)

}

</script>

<style scoped lang="less"></style>