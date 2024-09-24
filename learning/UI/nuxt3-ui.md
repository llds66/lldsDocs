---
title: Nuxt3 集成Primevue
description: ""
editLink: ""
lastUpdated: 2024-09-18 10:05:09
createDate: 2024-09-18 10:04:38
---



> [创建 Nuxt 项目](https://nuxt.com/docs/getting-started/installation#new-project)
>
> [Install PrimeVue with Nuxt](https://primevue.org/nuxt)

# Nuxt3 + Primevue + UnoCSS

<div style="display:flex;justify-content:center;margin-top:40px">
<img src="https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/LogosNuxtIcon%20(1).png" style="width:70px">
<img src="https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/3494069.png" style="padding-left:20px;padding-right:20px">
<img src="https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/logo.svg" style="width:50px">
</div>



## 创建 NuxtJS 项目

```bash
npx nuxi@latest init <project-name>
```

## 安装 Primevue

```bash
npm install primevue
npm install --save-dev @primevue/nuxt-module
npm install @primevue/themes
```

配置 `nuxt.config.ts`

```typescript
import Aura from '@primevue/themes/aura';
export default defineNuxtConfig({
    modules: [
        '@primevue/nuxt-module'
    ],
    primevue: {
        options: {
            theme: {
                preset: Aura
            }
        }
    }
}))
```

## 安装 UnoCSS

```bash
npm install -D unocss @unocss/nuxt
```

配置 `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],
})
```

项目根目录创建 `uno.config.ts`

```typescript
import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({ /* preset options */}),
    presetUno(),
  ],
})
```

注意：Vue项目中需要手动导入 `uno.css` ，在Nuxt中由模块自动注入。 

## 安装 CSS Icons (可选)

> [Primevue icon](https://primevue.org/icons/)
>
> [UnoCSS Icon](https://unocss.dev/presets/icons)
>
> [Nuxt Icon](https://nuxt.com/modules/icon)

### Primevue Icon

1. **安装 PrimevueIcon**

```bash
npm install primeicons
```

2. **配置 `nuxt.config.ts`**

```typescript
css: [
    'primeicons/primeicons.css',
  ],
```

3. **使用** 

​	查看 [PrimevueIcons List](https://primevue.org/icons/#list) 可以的图标列表，在 `i或span` 等元素中使用 `pi pi-{icon}` ,也可以在组件中使用.

### UnoCSS Icon

1. **安装图标集合**

```bash
# 安装 Iconify 某个图标集合,集合名称可在Icones 网站上查找
npm install -D @iconify-json/[the-collection-you-want]

# 或者安装 Iconify 上可用的所有图标集 (~130MB)
npm install -D @iconify/json 
```

2. **配置uno.config.ts**

```ts
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({ /* options */ }),
  ],
})
```

3. **使用**
    在 class 使用 `<prefix><collection>-<icon>` 或者 `<prefix><collection>:<icon>`

### Nuxt Icon

1. **安装**

```bash
npx nuxi module add icon

// 在本地安装图标数据，icones.js.org 在查看
npm i -D @iconify-json/[the-collection-you-want] 
```

2. **使用**

```html
<Icon name="uil:github" style="color: black" />
```

可以使用 [icones.js.org](https://icones.js.org/) 集合中的任何名称，
