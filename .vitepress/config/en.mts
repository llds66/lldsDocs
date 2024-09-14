import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export const en =  defineConfig({
  title: "lldsDocs",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/en' },
      { text: 'Learn', link: '/en/learn/vuejs' },
      { text: 'Project', link: '/en/projects' },
      { text: 'PersonWeb', link: 'https://llds.cc' }
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
      { icon: 'github', link: 'https://github.com/llds66/lldsDocs' }
    ]
  }
})
