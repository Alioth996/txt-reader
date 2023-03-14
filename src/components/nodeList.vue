<template>
  <div class="p-4 sm:px-5">
    <div class="m-3 text-xl text-gray-700 sm:text-xl">目录</div>
    <ul class="space-y-1.5 font-inter font-medium">
      <li
        class="flex rounded-lg px-4 py-2 tracking-wide outline-none transition-all hover:bg-slate-200 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100"
        v-for="chapter in props.listDatas" :title="chapter">{{ chapter }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(['listDatas'])
</script>
