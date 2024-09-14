import { defineConfig } from 'vitepress'
import { en } from './en.mjs'
import { zh } from './zh.mjs'

export default defineConfig({
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  locales: {
    root: { label: '简体中文', ...zh },
    en: { label: 'English', ...en },
  },
})