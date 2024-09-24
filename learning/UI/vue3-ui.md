---
title: Vue3 集成Primevue
date: 2024/9/17
updateTime: 2024-09-18 09:16:43
description: 
editLink: ""
createDate: 2024-09-17 22:43:06
lastUpdated: 2024-09-19 09:37:21
---

> [Vue3 创建Vue应用](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)
>
> [PrimeVue with Vite](https://primevue.org/vite/)
>
> [PrimeVue components with auto imports](https://primevue.org/autoimport/)
>
> [UnoCSS Vite Plugin](https://unocss.dev/integrations/vite)

# Vue3 + Primevue + UnoCSS

<div style="display:flex;justify-content:space-between">
<img src="https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/LogosVue.png" alt="LogosVue" style="width:55px" />
<img src="https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/3494069.png">
<img src="https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/logo.svg" style="width:50px">
</div>



## 创建 Vue3 项目

```bash
npm create vite@latest
```

## 安装 Primevue

```bash
npm install primevue
npm install @primevue/themes
```

配置main.ts

```ts
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
```

### 自动导入

安装

```bash
npm i unplugin-vue-components -D
npm i @primevue/auto-import-resolver -D
```

配置vite.config.ts

```ts

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })]
})
```

## 安装 UnoCSS

按装 [UnoCSS](https://unocss.dev/) ,配置 [Tailwind CSS](https://tailwindcss.com/) 后primevue组件的样式、工具类才能生效。 primevue官网应该是直接安装Tailwind CSS，UnoCSS是按需引入的，也解决了Tailwind CSS的问题，直接使用通过UnoCSS使用。

安装

```bash
npm install -D unocss
```

配置 `vite.config.ts`

```ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
```

项目根目录创建 `uno.config.ts`

```ts
import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({ /* preset options */}),
    presetUno(),
  ],
})
```

配置main.ts

```ts
// unocss
import "uno.css"
```

## 安装 CSS Icon (可选)

> [PrimevueIcons List](https://primevue.org/icons/#list)
>
> [Primevue icon](https://primevue.org/icons/)
>
> [UnoCSS Icon](https://unocss.dev/presets/icons)
>
> [Icones 所有图标集合](https://icones.js.org/)

### PrimevueIcon



1. **安装PrimevueIcons，可以安装一下scss.**

```bash
npm install primeicons
```

2. **在`style.scss` 中导入.**

```scss
import 'primeicons/primeicons.css'
```

3. **使用** 

`i或span` 等元素中使用 `pi pi-{icon}` ,也可以在组件中使用.

### UnoCSS Icon

1. **安装图标集合**

```bash
# 安装 Iconify 某个图标集合,集合名称可在Icones 网站上查找
npm install -D @iconify-json/[the-collection-you-want]

# 安装 Iconify 上可用的所有图标集 (~130MB)
npm install -D @iconify/json 

```

2. **配置uno.config.ts**

```ts
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({ /* options */ }),
    // ...other presets
  ],
})
```

3. **使用**
在 class 使用   `<prefix><collection>-<icon>` 或者 	 `<prefix><collection>:<icon>`


------

现在可以查看primevue的文档，在Vue3 项目中使用了其组件了。









