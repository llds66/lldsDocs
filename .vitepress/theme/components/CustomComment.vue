<script setup lang='ts'>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vitepress';

const options = {
    owner: 'llds66',
    repo: 'webComment',
    clientId: 'Iv23liPqHYQciCUs1hfb',
    darkMode: true,
    proxy: 'https://llds.fun'
};

// 模拟获取或生成对应的 GitHub issue id 的函数
const getGithubIssueId = (path: string): number => {
    const issueMap = {
        '/learning/HTML/overview.html': 3,
        '/learning/CSS/overview.html': 4,
        '/learning/JavaScript/overview.html': 5,
        '/learning/UI/overview.html': 6,
        '/learning/UI/vue3-ui.html': 6,
        '/learning/UI/nuxt3-ui.html': 6,
        '/learning/VueJS/overview.html': 7,
        '/learning/NodeJS/overview.html': 8,
        '/learning/ExpressJS/overview.html': 9,
        '/learning/NuxtJS/overview.html': 10,
        '/learning/NestJS/overview.html': 11,
        '/learning/NestJS/study_nest.html': 11,
    };
    return issueMap[path] || 1; // 1 表示没有对应的 issue id
};

const route = useRoute(); // 获取当前的路由对象

// 初始化评论系统的函数
const initComment = (path: string) => {
    const githubIssueId = getGithubIssueId(path);
    console.log('文章路径:', path, '对应的 issue id:', githubIssueId);

    const themeAppearance = localStorage.getItem('vitepress-theme-appearance');
    console.log('当前主题外观:', themeAppearance);

    // 设置 darkMode
    if (themeAppearance === 'dark') {
        options.darkMode = true;
    } else {
        options.darkMode = false;
    }

    import("./cwgi.js").then(({ init }) => {
        init(githubIssueId, options);
    });
};

onMounted(() => {
    // 确保 route 已经存在且 path 非空
    if (route && route.path) {
        initComment(route.path);
    } else {
        console.error('无法获取当前路径');
    }

    // 监听 localStorage 主题变化
    window.addEventListener('storage', (event) => {
        if (event.key === 'vitepress-theme-appearance') {
            console.log('检测到主题外观变化:', event.newValue);
            initComment(route.path);
        }
    });
});

watch(() => route.path, (newPath) => {
    if (newPath) {
        console.log(newPath);
        initComment(newPath); // 路由变化时，重新加载评论系统
    } else {
        console.error('路径未定义');
    }
});
</script>

<template>
    <div id="cwgi_box" style="margin-top: 50px;"></div>
</template>

<style>
.cwgi-z-50 {
    z-index: 1!important;
}

/* 这里是CSS */
</style>