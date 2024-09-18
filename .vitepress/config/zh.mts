import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export const zh =  defineConfig({
  title: "学习文档",
  description: "A VitePress Site",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '学习', link: '/learning' },
      { text: '项目', link: '/projects' },
      { text: '个人网站', link: 'https://llds.cc' }
    ],
    sidebar: {
      // learning 知识点页面侧边栏
      '/learning/': [
        {
          text: 'HTML',
          collapsed: true,
          items: [
            { text: 'html 介绍', link: '/learning/HTML/overview' },
          ]
        },
        {
          text: 'CSS',
          collapsed: true,
          items: [
            { text: 'css 介绍', link: '/learning/CSS/overview' },
          ]
        },
        {
          text: 'JavaScript',
          collapsed: true,
          items: [
            { text: 'javascript 介绍', link: '/learning/JavaScript/overview' },
          ]
        },
        {
          text: 'UI',
          collapsed: true,
          items: [
            { text: 'ui 介绍', link: '/learning/UI/overview' },
            { text: 'vue3 集成', link: '/learning/UI/vue3-ui' },
            { text: 'nuxt3 集成', link: '/learning/UI/nuxt3-ui' },
          ]
        },
        {
          text: 'Vue JS',
          collapsed: true,
          items: [
            { text: 'vuejs 介绍', link: '/learning/VueJS/overview' },
          ]
        },
        {
          text: 'Node JS',
          collapsed: true,
          items: [
            { text: 'nodejs 介绍', link: '/learning/NodeJS/overview' },
          ]
        },
        {
          text: 'Express JS',
          collapsed: true,
          items: [
            { text: 'expressjs 介绍', link: '/learning/ExpressJS/overview' },
          ]
        },
        {
          text: 'Nuxt JS',
          collapsed: true,
          items: [
            { text: 'nuxtjs 介绍', link: '/learning/NuxtJS/overview' },
          ]
        },
        {
          text: 'Nest JS',
          collapsed: true,
          items: [
            { text: 'nestjs 介绍', link: '/learning/NestJS/overview' },
          ]
        },
      ],

      // projects 项目页面侧边栏
      '/projects/': [
        {
          text: '运维管理',
          collapsed: true,
          items: [
            { text: '运维管理mOps', link: '/projects/mOps/overview' },
          ]
        },
        {
          text: '个人网站',
          collapsed: true,
          items: [
            { text: '个人网站', link: '/projects/PersonWeb/overview' },
          ]
        },
      ]
    },
    outline: {
      label: '导航'
    },
    editLink: {
      pattern: 'https://github.com/llds66/lldsDocs/tree/main/:path',
      text: '在 GitHub 上编辑此页面'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/llds66/lldsDocs' },
      { icon: 'discord', link: 'https://discord.gg/GHECRvjSf4' },

    ]
  }
})
