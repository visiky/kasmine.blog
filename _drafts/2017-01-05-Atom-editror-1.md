---
layout: post
title: "Atom 入门捣鼓记"
catogories: [前端文本编辑器]
tags: [Atom,前端]
---

**前言**
前段时间，自学python，想利用subline text轻量级的文本编辑器 来写python代码就好了，于是花了一段时间，装了各种python插件，导致sublime text很容易闪退，而且不易打开css文件。不是很清楚 哪里出了问题，也没有继续去探个究竟。听说Atom编辑器也是蛮赞的，所以今天来捣鼓了一下。

## 主题推荐

个人比较看重开发环境，所以比较喜欢在主题方面寻找最适合自己，最让自己赏心悦目的一款，以下是我使用的一些体会和推荐~


其实Sublime很多主题 在Atom也是有的，重复的我就不说了，推荐一下其他的吧~
| 主题| 介绍|
| ------------- |:-------------:|
|Graphite-ui |  |
| OneDark-ui | 也是很耐看的一款主题，与之搭配的color_theme 可以参考这个[OneDark-ui](https://atom.io/themes/one-dui)
 |
 搭配 语法主题 `Babel React Syntax Theme` (主要是为了ES6 使用)
####    安装方式

![这里写图片描述](http://img.blog.csdn.net/20170105192256879?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTGlhb3hpYW9qdWFuMjMz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

##  插件推荐
 无论是sublime 还是 Atom 都拥有着丰富的插件，这也是为什么很多人喜欢这两款编辑器的原因
###    Atom
Packages 列表：https://atom.io/pacsages

![](http://img.blog.csdn.net/20170105204511245?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTGlhb3hpYW9qdWFuMjMz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

- 界面优化设置插件
  - Seti-icons :喜欢优美界面的当然少不了文件的图标显示了~~
  - atom-icons ：同上
  - atom-beautify

- 代码编写优化设置插件
  - snippet类 :根据自己的需要下载相应的代码片段补全插件
  - tokamak-terminal:命令行一个插件就行  
  ![个性化设置]({{ site.urlimg }}post/atom-terminal-1.png)
    ![]({{ site.urlimg }}post/atom-terminal-2.png)
  - Autocomplete Paths:自动补全代码

## 快捷键
这里说一下自己觉得好用 常用的快捷键吧(其实纯属为给自己做个笔记，记牢~~）
<kbd>Ctrl</kbd>+<kbd>K</kbd>+<kbd>B</kbd>：关闭侧板栏，可让编辑界面大一些（同sublime）

<kbd>F11</kbd>：全屏

<kbd>Ctrl</kbd>+<kbd>G</kbd>:快速跳转到某一行

<kbd>Ctrl</kbd>+<kbd>W</kbd>:关闭当前文件

<kbd>Ctrl</kbd>+<kbd>T</kbd>:检索文件

<kbd>Ctrl</kbd>+<kbd>B</kbd>:快速检索当前打开的文件

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd>:快速打开上一次(最近一次关闭)的文件



<kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>M</kbd>':'markdown-preview:toggle'

<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kdb>F2</kbd>：添加/删除书签


## 总结一下
其实Atom就是Sublime的变形，只是提供了额界面窗口更方便使用而已，配置更加简单【但似乎听说Atom的性能比较差~在安装插件的时候深有感触~可以sublime和Atom一起使用 斟酌一下吧~】
