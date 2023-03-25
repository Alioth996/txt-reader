<template>
    <div>
        <div class="upload-header" lg:p-lg>
            <input type="file" name="txt-file" accept=".txt" @change='uploadBook'>
            <p class="upload-icon" pb-2 text-2xl>+</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
const uploadBook = (e: Event) => {
    const files = (e.target as HTMLInputElement)?.files as FileList
    const txtNovel = files[0]
    if (!txtNovel) return

    const sliceTxt = txtNovel.slice(0, 1024)

    console.log(sliceTxt.text());





}

</script>

<style scoped></style>