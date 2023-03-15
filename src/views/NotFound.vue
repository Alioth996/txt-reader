<template>
    <div flex-col bg-light h-vh w-vw flex-c overflow-hidden gap-10 id="not-found">
        <h3 text='red 5xl'>404! Not-found</h3>
        <router-link to="Home">
            <button transition-300 py-2 px-4 text-4 text-active bg-bookbg border-rd-1 hover:bg-active hover:text-bookbg>返
                回</button>
        </router-link>
    </div>
</template>

<script setup lang="ts">

useHead({
    title: '404 - Not-Found'
})


</script>