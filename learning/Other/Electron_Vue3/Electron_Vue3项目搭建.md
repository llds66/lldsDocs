---
title: Electron_Vue3项目搭建
date: 2024/7/21
hideComments: false
categories:
 - Electron
tags:
 - Electron
 - Vue
---

> 参考资料链接

> [知乎教程](https://zhuanlan.zhihu.com/p/422648687)

> [B站教程(up主：一路向北在花海搁浅)](https://www.bilibili.com/video/BV1as8FeQEcs/?share_source=copy_web&vd_source=aff5b714b4f463a571c10c13092fb70a)

> [B站教程（up主：九弓子）](https://www.bilibili.com/video/BV1SS4y1h7CL/?share_source=copy_web&vd_source=aff5b714b4f463a571c10c13092fb70a)

> [electron-builder打包过慢问题](https://www.ewbang.com/community/article/details/999991493.html)

一开始用npm下载electron包，一直下载不下来，试了镜像源，pnpm等其他包管理，不知道为什么只有cnpm可以下载electron包，所以就用cnpm包管理吧。

1. **创建Vue项目，安装相关依赖**
```bash
# 创建vue项目
cnpm create vite@latest

# 安装 electron依赖
cnpm install electron -D

# 安装同启动依赖
cnpm install -D concurrently

# 安装桌面热重载
cnpm install -D  wait-on (选择一)
cnpm install electorn-reloader(选择二)

# 打包
cnpm install -D cross-env electron-builder
```

2. **配置文件**

创建electron文件夹，在里面创建main.js（主进程）、preload.js（预进程）文件
```bash
// 主进程
// 主进程
import {app,BrowserWindow} from 'electron'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const NODE_ENV = process.env.NODE_ENV
// 获取当前模块的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })

  win.loadURL(
    NODE_ENV === 'development'
    ? 'http://localhost:3000'
    :`file://${join(__dirname, '../dist/index.html')}`
  )
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```
```bash
// 预进程
// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```
```json
{
  "name": "ev_2",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "./electron/main.js",
  "author": "LLds Shun",
  "license": "MIT",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "electron": "wait-on tcp:3000 && electron .",
    "serve": "concurrently -k \"npm run dev\" \"npm run electron\"",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.31"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.5",
    "concurrently": "^8.2.2",
    "electron": "^31.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.3.4",
    "vue-tsc": "^2.0.24",
    "wait-on": "^7.2.0"
  }
}

```
electron+vue主要文件：

- main.js(主进程): Electron 应用的主进程文件，负责管理和控制整个应用的生命周期和窗口。
- preload.js（预加载脚本）：是一个在渲染进程加载前运行的脚本，它的主要作用是为渲染进程提供安全的上下文，避免直接访问 Node.js 的功能，同时可以安全地使用 `contextBridge` 和 `ipcRenderer` 来进行进程间通信。  
-  Vue 项目（渲染进程) : Vue 项目作为渲染进程，是用户界面的核心部分。  

3. **打包**
```json
"electron:build": "vite build && electron-builder" 
"build": {
  "appId": "com.your-website.your-app",
  "productName": "ElectronApp",
  "copyright": "Copyright © 2024 LLds Shun",
  "mac": {
    "category": "public.app-category.utilities"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true
  },
  "files": [
    "dist/**/*",
    "electron/**/*"
  ],
  "directories": {
    "buildResources": "assets",
    "output": "dist_electron"
  }
}
```
使用环境变量`NODE_ENV`来切换生产和开发环境，生产环境为`NODE_ENV=production`，开发环境为`NODE_ENV=development`
```json
// 主进程
import {app,BrowserWindow} from 'electron'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const NODE_ENV = process.env.NODE_ENV
// 获取当前模块的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })

  win.loadURL(
    NODE_ENV === 'development'
    ? 'http://localhost:3000'
    :`file://${join(__dirname, '../dist/index.html')}`
  )
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```
打包速度慢，修改.npmrc文件。
```json
registry=https://registry.npmmirror.com/
home=https://npmmirror.com
disturl=https://registry.npmmirror.com/-/binary/node/
sass_binary_site=https://registry.npmmirror.com/node-sass
phantomjs_cdnurl=https://registry.npmmirror.com/phantomjs
chromedriver_cdnurl=https://registry.npmmirror.com/-/binary/chromedriver/
operadriver_cdnurl=https://registry.npmmirror.com/-/binary/operadriver/
electron_mirror=https://registry.npmmirror.com/-/binary/electron/
electron_builder_binaries_mirror=https://registry.npmmirror.com/-/binary/electron-builder-binaries/
always-auth=false
```
