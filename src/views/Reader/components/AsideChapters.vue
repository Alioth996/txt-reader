<template>
    <!-- 侧边目录 -->
    <n-drawer v-model:show="showChapter" width="300" placement="left" :show-mask="false">
        <n-drawer-content title="目录" closable>
            <template #default>
                <p v-for="chapter in chapterList" text-4>{{ chapter }}</p>
            </template>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang='ts'>

const props = defineProps<{ chapterList: Array<string>, chapterShow: boolean }>()
const showChapter = computed(() => props.chapterShow === true ? true : false)
</script>
