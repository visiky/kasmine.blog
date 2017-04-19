---
layout: post
title: 命令行中通过 apm 安装包和主题
tags: [前端,Atom]
---

由于每次都要打开Settings->Install来安装主题和包,不是很方便

但我们可以在命令行中通过 apm 安装主题包。

可以在控制台运行如下命令来检查你是否安装了 apm：

`$ apm help install`

正常应该看到 apm install 命令的详细信息打印出来。

如果没有的话，参考 [安装 Atom](http://mazhuang.org/atom-flight-manual/chapter-1-getting-started/installing-atom.html) 一节里给你的系统安装 apm 和 atom 命令的相关说明。

你也可以使用 apm install 命令安装 packages：

apm install <package_name> 会安装最新版本。
apm install <package_name>@<package_version> 会安装指定版本。
比如，apm install emmet@0.1.5 会安装 Emmet 包的 0.1.5 发行版。

你也可以使用 apm 来搜索新的包并安装。运行 apm search 命令可以在包登记处（package registry）搜索想找的包。
