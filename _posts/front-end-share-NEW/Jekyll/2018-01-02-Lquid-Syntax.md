---
layout: post
title: 精选Lquid语法小知识--持续更新
# header-img: 
tag: [Jekyll, Blog]
category: 前端分享/Jekyll
excerpt_separator: "excerpt_end"
---

🤫 Lquid —— 搭建Jekyll博客使用的模版语言。具体的语法介绍网上很多，自行查阅。

😁 此篇主要收集一些比较隐晦但又是比较受用的语法

主要内容:
1. 生成摘要 `post.excerpt`
2. 好用的过滤器

excerpt_end

## 生成摘要 `post.excerpt`

- 如果我们想限制「摘要」长度的话: `\{\{ post.excerpt | truncate: 100 \}\}`
- 但是，有的时候截取的内容并不是我们想要的样子，我们想限制固定的内容作为摘要:

```js
// 配置文件中设定 excerpt_separator 取值
// 每篇 post 都会自动截取从开始到这个值间的内容作为这篇文章的摘要 post.excerpt 使用。
// 1. 头文件
excerpt_separator: "your_excerpt_separator"

// 2. post内容

摘要摘要摘要摘要
your_excerpt_separator
主要内容

// 3. 然后在 _layout/post.html中，使用
\{\{ content | remove: 'your_excerpt_separator' \}\}
```

## 好用的过滤器

**remove**: 删除制定的文本 `\{\{ content | remove: 'your_excerpt_separator' \}\}`