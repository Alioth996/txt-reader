<template>
    <span>上传文件为：{{ book.name }}</span>
    <m-upload @upload="uploadHandle" file-types="txt">
        <img :src="fileUrl" alt="" v-if="fileUrl">
    </m-upload>
</template>
  
<script setup lang="ts">

import { ref } from "vue";
import { MPrinter, MUpload } from "shuimo-ui";

const book = ref({
    name: ''
});
const fileUrl = ref('');

const uploadHandle = (file: any) => {
    book.value = file
    MPrinter('文件上传组件').info(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
        fileUrl.value = e.currentTarget.result;
    }

}
</script>