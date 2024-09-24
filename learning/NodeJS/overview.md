---
title: title
date: 2024/9/24
---

## Node JS 介绍

> NodeJS [中文文档 ](https://nodejs.org/zh-cn)

<img src="https://cdn.jsdelivr.net/gh/llds66/imageBed/githubImage/20240524/nodejsDark.svg" alt="Node.js Logo" />

Node.js 是一个开源、跨平台的 JavaScript 运行时环境。它是几乎适用于任何类型项目的流行工具！

Node.js 在浏览器外部运行 V8 JavaScript 引擎，这是 Google Chrome 的核心。这使得 Node.js 具有非常高的性能。

Node.js 应用程序在单个进程中运行，无需为每个请求创建新线程。 Node.js 在其标准库中提供了一组异步 I/O 原语，可防止 JavaScript 代码阻塞，并且通常 Node.js 中的库是使用非阻塞范例编写的，这使得阻塞行为成为例外而不是常态。

当 Node.js 执行 I/O 操作（例如从网络读取、访问数据库或文件系统）时，Node.js 不会阻塞线程并浪费 CPU 周期等待，而是会在响应返回时恢复操作。

这使得 Node.js 能够通过单个服务器处理数千个并发连接，而不会引入管理线程并发的负担，而管理线程并发可能是错误的重要来源。

Node.js 具有独特的优势，因为数百万为浏览器编写 JavaScript 的前端开发人员现在除了客户端代码之外还可以编写服务器端代码，而无需学习完全不同的语言。

在 Node.js 中，可以毫无问题地使用新的 ECMAScript 标准，因为您不必等待所有用户更新其浏览器 - 您负责通过更改 Node.js 版本来决定使用哪个 ECMAScript 版本，您还可以通过运行带有标志的 Node.js 来启用特定的实验性功能。