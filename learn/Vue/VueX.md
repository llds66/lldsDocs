---
title: VueX
date: 2024/4/1
hideComments: false
categories:
 - web前端
tags:
 - vue2
---

## （一）相关资料

> [Vue2-vuex3官方文档](https://v3.vuex.vuejs.org/zh/)
>
> [Vue3-vuex4官方文档](https://vuex.vuejs.org/zh/)



## （二）基本使用

### 1.安装

```bash
# 最新版 用于vue3项目
npm install vuex

# 指定版本 用于vue2项目
npm install vuex@3.6.2
```

### 2.配置

```javascript
//store/index.js
// 导入vue
import Vue from 'vue'
  
//导入vue-router
import VueX from 'vuex'

// 通过Vue.use()安装路由功能
Vue.use(VueX)

// 创建仓库,并导出
const store = new Vuex.Store({
    // 数据
    state: {
      count: 100,
      name: "张三",
    },

    mutations: {
      // /mutations是一个对象，对象中存放修改state的方法
      increment(state) {
        state.count++;
      }
    },
  
});

 export default store;
```

```javascript
//main.js
import store from './store'

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
```



## （三）核心概念

### 1.state

### 2.mutatios

更改VueX的store中的状态的方法是提交mutations

提交mutations有两种方法：

- `this.$store.commit('xxx')`
- 使用mapMutations辅助函数映射

### 3.actions

用于提交mutations

### 4.modules

## （四）辅助函数

### 1.mapState

将vuex中的state数据映射到计算属性

### 2.mapMutations

将vuex中的mutations定义的方法映射到methods



















