<template>
    <div text-4>
        <span>{{ label }}</span>: <b>{{ content }}</b> ?
    </div>
</template>

<script setup lang="ts">

defineProps<{ label: string, content: string }>()

</script>