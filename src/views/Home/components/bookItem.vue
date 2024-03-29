<template>
    <li class="novel" v-show="book.id" py-sm gap-5 w-full grid grid-cols-6>
        <div class="book-cover" @click="toReaderBook(book.id, book.name)" opacity-90 hover-opacity-100 cursor-pointer w-full
            max-w-28 sm:xl-w-200 truncate drop-shadow-lg py-13 px-sm bg-light b-rd-1 text-white text-sm font-600 text-center
            col-span-2>
            {{ book.name }}
        </div>

        <div class="book-meta" text-sm flex="~ col" justify-center gap-1 col-span-3>
            <p v-show="book.name" class="single-line" text-dark font-600 text-md> {{ book.name }}</p>
            <p py-1 v-show="book.author" text-light>{{ book.author }}</p>
            <p py-1 v-show="book.uploadTime" text-light>{{ book.uploadTime }}</p>
            <p v-show="book.size" text-light>{{ book.size }} MB</p>
        </div>

        <div flex items-end>
            <button w-full h-10 text-md py-2 b-rd-1 flex-c bg-grayLight text-white text-sm font-400 cursor="pointer"
                hover="opacity-90 text-bookbg" class="delete-btn" hover:bg-gray @click="deleteBook(book.id, book.name)">
                <img :src="deleteIcon" alt="del" w-6 h-6>
            </button>
        </div>
    </li>
</template>

<script setup lang='ts'>

import deleteIcon from '@/assets/delete-red.svg'
import { useRouter } from 'vue-router';
import { BookIF } from '@/types';
import { useIndexedDB } from '@/utils/db';
import { useDialog } from 'naive-ui'
import DailogContent from '@/components/DailogContent.vue';



const { removeBook, getAllBookInfo } = useIndexedDB()
const emit = defineEmits<{
    (e: 'del-book', books: BookIF[]): void
}>()


const dialog = useDialog()

defineProps({
    book: {
        type: Object as PropType<BookIF>,
        required: true
    }
})


const deleteBook = async (id: string | number, bookName: string) => {
    dialog.warning({
        title: '温馨提示',
        content: () => h(DailogContent, { label: '删除小说', content: `${bookName}` }),
        positiveText: '确定',
        onPositiveClick: async () => {
            await removeBook(id)
            const books = await getAllBookInfo<BookIF>()
            emit('del-book', books)
        },
    })
}

const router = useRouter()
const toReaderBook = (bookId: number, bookName: string) => {
    router.push({
        name: 'Reader',
        params: {
            bookId,
            bookName
        }
    })
}

</script>