<script setup lang='ts'>
import { init } from "./cwgi.js"
import { onMounted } from 'vue';

const githubIssueId = 3;
const options = {
    owner: 'llds66',
    repo: 'webComment',
    clientId: 'Iv23liPqHYQciCUs1hfb',
    darkMode: true,
    proxy: 'https://llds.fun'
}
onMounted(() => {
    init(githubIssueId, options)
})
</script>

<template>
    <div id="cwgi_box" style="margin-top: 50px;"></div>
</template>

<style>
/* 这里是CSS */
</style>