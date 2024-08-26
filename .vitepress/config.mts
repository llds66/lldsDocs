import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "lldsDocs",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Learn', link: '/learn' },
      { text: 'Project', link: '/projects' },
      { text: '个人网站', link: 'https://llds.cc' }
    ],
    sidebar: {
      // learn 知识点页面侧边栏
      '/learn/': [
        {
          text: 'vue',
          collapsed: false,
          items: [
            { text: 'Index', link: '/guide/' },
            { text: 'One', link: '/guide/one' },
            { text: 'Two', link: '/guide/two' }
          ]
        },
        {
          text: 'nuxt',
          collapsed: true,
          items: [
            { text: 'Index', link: '/guide/' },
          ]
        },
        {
          text: 'node',
          collapsed: true,
          items: [
            { text: 'Index', link: '/guide/' },
            { text: 'One', link: '/guide/one' },
          ]
        },
        {
          text: 'express',
          collapsed: true,
          items: [
            { text: 'Index', link: '/guide/' },
          ]
        },
      ],

      // project 项目页面侧边栏
      '/projects/': [
        {
          text: 'mOps',
          collapsed: false,
          items: [
            { text: 'Index', link: '/config/' },
            { text: 'Three', link: '/config/three' },
            { text: 'Four', link: '/config/four' }
          ]
        },
        {
          text: 'personWeb',
          collapsed: true,
          items: [
            { text: 'Index', link: '/config/' },
            { text: 'Three', link: '/config/three' },
            { text: 'Four', link: '/config/four' }
          ]
        },
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/llds66' }
    ]
  }
})
