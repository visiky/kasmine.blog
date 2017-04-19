---
layout: post
author: kasmine
tags:  [git,版本控制,github]
---

# Git 分支管理

## Git fast forward
多人协同开发,或者多条分支使用Git经常会看到警告信息包含术语：fast forward, 这是何义？

简单来说就是远程中心git仓库中已经有一部分代码,和你当前本地的代码不同,所以它不允许你直接把你的代码覆盖上去。

比如A从中心仓库拿到代码后，对文件f进行了修改。然后push到中心仓库。

B在A之前就拿到了中心仓库的代码，在A push成功之后也对f文件进行了修改。这个时候B也运行push命令推送代码。

会收到一个类似下面的信息：
```
error: failed to push some refs to 'https://github.com/Me-Momo/kasmine'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
有两种解决的方法：

1. 强推，即利用强覆盖方式用你本地的代码替代git仓库内的内容
git push -f

2. 先把git的东西fetch到你本地然后merge后再push
```
$ git fetch
$ git merge
```
问题:但这样子,就会把远程仓库里的东西覆盖掉

建议:不要使用`non-fast-forward`,会导致？？
