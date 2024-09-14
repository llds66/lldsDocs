---
title: VueRouter
date: 2024/4/22
hideComments: false
tags:
 - Vue
categories:
 - web前端
---

---



## （一）相关资料

> [vue2-Vue Router3 官方文档](https://v3.router.vuejs.org/zh/)
> 
> [vue3-Vue Router4 官方文档](https://router.vuejs.org/zh/)
> 
> [CSDN博客 vue-router 路由](http://t.csdnimg.cn/9ufuz)

## （二）安装vueRouter
:::: code-group
::: code-group-item Vue2
```bash
# 安装指定版本 用于vue2项目
npm install vue-router@3.6.5
```
:::
::: code-group-item Vue3
```bash
# 默认安装最新版本 用于vue3项目
npm install vue-router
```
:::
::::

## （三）配置文件

### 1. 路由配置


:::: code-group
::: code-group-item Vue2
```javascript
// 导入vue
import Vue from 'vue'
  
//导入vue-router
import VueRouter from 'vue-router'

// 通过Vue.use()安装路由功能
Vue.use(VueRouter)


// 导入组件
import ...
// 创建路由规则,并导出
export default new VueRouter({
  routes: [
    { path: "/", redirect: "/index" }, //重定向

    { path: "/index", component: SxIndex },
   
    { path:"/layout",component:SxLayout, redirect: '/find',
      // 二级路由
      children:[
        { path: "/find", component: SxFind },
        { path: "/my", component: SxMy },
        { path: "/friends", component: SxFriends },
      ]
    },

    { path: "*", component: NotFond }, //404
  ],
});
```
:::
::: code-group-item Vue3
```javascript
import { createRouter,createWebHistory} from "vue-router";  //导入createRouter createWebHistory
import LoginVue from '@/views/Login.vue'
import Layout from "@/views/Layout.vue";

import ArticleCategory from '@/views/article/ArticleCategory.vue'
import ArticleManage from '@/views/article/ArticleManage.vue'

import UserAvatar from '@/views/user/UserAvatar.vue'
import UserInfo from '@/views/user/UserInfo.vue'
import UserResetPassword from '@/views/user/UserResetPassword.vue'

const routes = [
  { path:'/login',component:LoginVue},
  {
    path:'/',
    component:Layout,
    redirect:'/article/manage',
    //     子路由
    children:[
      { path:'article/category',component:ArticleCategory},
      { path:'article/manage',component:ArticleManage},
      { path:'user/info',component:UserInfo},
      { path:'user/avatar',component:UserAvatar},
      { path:'user/password',component:UserResetPassword},
    ]
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
});
export default router;
```
:::
::::

### 2. 注入vue根实例


:::: code-group
::: code-group-item Vue2
```javascript
// 导入规则
import router from './router'

// 创建和挂载根实例。记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
```
:::
::: code-group-item Vue3
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
app.use(router)
app.mount('#app')
```
:::
::::

### 3. 路由规则常用的属性

重定向：redirect

```javascript
{ path:'/',redirect:'/home'}
{ path:'/home',component: Home}
```

通配符 * :不匹配时指向

```javascript
{ path:'*', component:NotFound}
```

meta：路由元信息，配置自定义内容

```javascript
{ path:'/home',component:Home,meta:{isAuth:true}}
// 配置自定义属性isAuth，用于路由守卫的判断
```

## （四）使用

### 1. 展示

通过`<router-view> </router-view>`展示

### 2. 跳转

#### 2.1 声明式导航

通过`<router-link to="/index"> <router-link>`类似a标签进行跳转

#### 2.2 编程式导航

```javascript
// vue-router 提供了许多编程式导航的 API

// 跳转到指定 hash 地址，并增加一条历史记录
this.$router.push('地址')

//跳转到指定的 hash 地址，并替换掉当前的历史记录
this.$router.replace('hash 地址')

//后退到历史记录的上一个页面
this.$router.back()
// 前进到历史记录的下一个页面
this.$router.forward() 
this.$router.go(数值 n)
```

## (五) 路由工作模式

### hash模式（默认）

- 就是代表 hash ，后面就是 hash 值
- 后面的值都是不发给服务器的

### history模式

- 是没有 # 号的

```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

## （六）导航守卫

### 1. 全局前置守卫

```javascript
const router = new VueRouter({ ... })

// 每次路由切换之前
router.beforeEach((to, from, next) => {
  // ...
})
```

- to: Route: 即将要进入的目标 路由对象
- from: Route: 当前导航正要离开的路由
- next(): 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

### 2. 全局后置守卫

```javascript
router.afterEach((to, from) => {
  document.title=to.meta.title  // 定义到meta中
})
// 项目常用于更新网站标题
```

### 3.  路由独享守卫

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 4. 组件内的守卫

```javascript
export default{
  
beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  
beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  
beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }

}
```



