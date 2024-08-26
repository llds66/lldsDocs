---
title: Vue3项目配置
date: 2024/5/2
hideComments: false
tags:
 - web前端
categories:
 - Vue3
---
https://cn.vuejs.org/

## 1.创建vue应用（Vite打包）

已安装 18.3 或更高版本的 [Node.js](https://nodejs.org/)（node v18.18.2  | pnpm v8.6.10）

```bash
npm create vue@latest
```

```bash
pnpm create vue@latest
```

```
yarn create vue@latest
```

```bash
✔ Project name: … <your-project-name> (填)
✔ Add TypeScript? … No / Yes 
✔ Add JSX Support? … No / Yes 
✔ Add Vue Router for Single Page Application development? … No / Yes (选)
✔ Add Pinia for state management? … No / Yes (选)
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Playwright
✔ Add ESLint for code quality? … No / Yes (选)
✔ Add Prettier for code formatting? … No / Yes (选)
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes
```

```bash
cd <your-project-name>
pnpm install
pnpm run dev
```

## 2. 配置代码风格

(vscode)（ESLint 与 prettier）

### 2.1 vscode配置文件

```json
1. 安装了插件 ESlint，开启保存自动修复
2. 禁用了插件 Prettier，并关闭保存自动格式化
// ESlint插件 + Vscode配置 实现自动格式化修复
"editor.codeActionsOnSave": {
    "source.fixAll": true
},
"editor.formatOnSave": false,
```

### 2.2  .eslintrc.cjs配置文件

```json
module.exports = {
  {...},
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 单引号
        semi: false, // 无分号
        printWidth: 80, // 每行宽度至多80字符
        trailingComma: 'none', // 不加对象|数组最后逗号
        endOfLine: 'auto' // 换行符号不限制（win mac 不一致）
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
    // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
    'no-undef': 'error'
  },
  // 忽略element plus警告
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly'
  }
}

```

## 3. 安装配置库

### 3.1 VueRouter4

https://router.vuejs.org/zh/

创建vue项目时未添加，可使用`pnpm add vue-router@4`安装VueRouter4

main.js文件：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
```

router/index.js配置文件：

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      children: [
        // 1.监控概览
        {
          path: '/overview',
          component: () =>
            import('@/views/layout/components/overview/index.vue')
        }
      ]
    }
  ]
})

/*
 * 路由前置守卫
 */
router.beforeEach(() => {
  // nProgress.start()
})

/*
 * 路由后置守卫
 */
router.afterEach(() => {
  // nProgress.done()
})

export default router
```

必须选择其中一种路由的历史模式：Hash 模式，HTML5 模式，Memory 模式。

### 3.2 Pinia

https://pinia.vuejs.org/zh/

创建vue项目时未添加，可使用`pnpm add pinia`安装pinia

数据持久化插件：`pnpm add pinia-plugin-persistedstate -D`

main.js配置文件：

```javascript
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(createPinia().use(persist))
app.mount('#app')
```

stores/xx.js配置文件:

```javascript
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 用户模块
export const useUserStore = defineStore('big-user',() => {
    const token = ref('') // 定义 token
    return { token } },
  { persist: true // 持久化}
)
```



### 3.3 axios

`pnpm add axios`安装axios

utils/request.js配置文件：

```javascript
import axios from 'axios'
import router from '@/router'
import { useUserStore } from '@/stores/index'
import { ElMessage } from 'element-plus'

const baseURL = 'xxx.xxx'
const instance = axios.create({ baseURL, timeout: 100000 })

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => {
    Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    ElMessage({ message: res.data.message || '服务异常', type: 'error' })
  },
  (err) => {
    ElMessage({
      message: err.response.data.message || '服务异常',
      type: 'error'
    })
    console.log(err)
    if (err.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default instance
```

apis/xx.js配置文件

```javascript
import request from '@/utils/request'

/**
 * 注册接口
 */
export const userRegisterService = ({ username, password, repassword }) => {
  request.post('/api/reg', { username, password, repassword })
}

/**
 * 登录接口
 */
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}
```



### 3.4 element-plus

**自动按需引入**(默认 components 下的文件也会被自动注册)：

```bash
pnpm add element-plus 
pnpm add -D unplugin-vue-components unplugin-auto-import #  自动按需插件
```

```javascript
//vite配置（vite.config.js）
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    ...
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
})
```

### 3.5 sass

`pnpm add sass -D`安装sass

## 4. 配置代码检查（可选）

基于husky  的代码检查工作流

1. git初始化项目

2. 初始化 husky 工具配置`pnpm dlx husky-init && pnpm install`

3. lint-staged 配置`pnpm i lint-staged -D`（默认进行的是全量检查，耗时问题，进行配置，忽略文件）

   package.json配置文件文件:

   ```json
   {
       "scripts": {
           ...
       "lint-staged": "lint-staged"
       },
   	"dependencies": {
   		...
     },
       "devDependencies":{
     		...
       },
       "lint-staged": {
           "*.{js,ts,vue}": [
           "eslint --fix"
           ]
       }
   }
   ```

   

4. 修改 .husky/pre-commit 文件

   ```
   #!/usr/bin/env sh
   . "$(dirname -- "$0")/_/husky.sh"
   
   pnpm lint-staged
   ```

   
