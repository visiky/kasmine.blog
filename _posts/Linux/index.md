---
layout: post
title: 每天一个Linux命令
---

## Grep

> Linux查找文件内容

- 过滤查找文本文件内容
```sh
# 查看fruitlist.txt中关于apple的文本
grep apple fruitlist.txt
# -i: 忽略大小写
grep -i apple fruitlist.txt
# -R, -r, --recursive: 递归搜索子目录
grep -r apple fruitlist.txt
# -n, --line-number: 显示行号
grep -in apple fruitlist.txt
```

## Find

> 查看文件

$ find <指定目录> <指定条件> <指定动作>
　　- <指定目录>： 所要搜索的目录及其所有子目录。默认为当前目录。
　　- <指定条件>： 所要搜索的文件的特征。
　　- <指定动作>： 对搜索结果进行特定的处理。

```sh
# 查看以my开头的txt文件
find . -name 'my*.txt'
```

