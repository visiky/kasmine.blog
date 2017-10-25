---
layout: post
title: webpack配置 - 外部扩展
date: 2017/10/25
category: webpack
---

# `externals`

> 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。

`string`,`array`, `object`,`function`,`regexp`

比如: 引入jQuery

```js
// index.html
<script src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous"></script>

// webpack.config.js
externals: {
  jquery: 'jQuery'
}

// xx.js
import $ from 'jquery';

$('.my-element').animate(...);

```

* more info to see [webpack官网-Externals](https://webpack.js.org/configuration/externals/)