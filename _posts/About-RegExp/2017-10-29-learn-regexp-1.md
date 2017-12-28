---
layout: post
title: 正则表达式(1)
# category: 正则表达式
---

## 回溯引用：前后一致匹配

**前言**正则表达式的用途很多，特别是在查找替换，文本处理，爬虫项目中应用更是很多：
* 复杂的字符串搜寻、替换工作，无法用简单的方式(类似借助标准库函数)达成。
* 能够帮助你进行各种字符串验证。
* 不止应用于编程语言中：`JavaScript、JAVA、Perl、PHP、C#...`
* 也应用于许多操作系统的主流指令中：`Linux/Unix、Mac、Windows PowerScript`

由于正则表达式的流派很多，且关于JavaScript中的正则表达式的具体使用可以参照[MDN参考手册](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions) 或者这篇 博文 [**《玩转JavaScript正则表达式**](http://imweb.io/topic/56e804ef1a5f05dc50643106)**》**，而我此篇文章讲述的主要关于 回溯引用，主要是参考 《正则表达式必知必会》一书。

**介绍**
     先说点基本语法，正则表达式的创建方式如下两种，直接使用对象字面量（推荐）或者使用RegExp构造函数创建：
```
var
 pattern1 = /aabb/
;
var
 pattern2 = 
new
 RegExp('aabb');
```

我们来看一个情形，在一篇HTML文档中，我们要匹配所有 标题标签(<h1>-<h6>以及其结束标签)
  var
   sentence=`<h1><wbr>正则表达式</h1>

  Content is divided into two sections;
  　　　　　　　　<h2>subTitle</h2>

  another line`

```
var
 re = /<[hH][1-6]>.*?<\/[hH][1-6]>/
g;
console.log(sentence.match(re));
```

![image | center](http://images2015.cnblogs.com/blog/1073915/201702/1073915-20170220151044929-193330967.png "")

我们使用如上正则表达式，看起来似乎是对的，但是我们来看看这个例子
  var
   sentence =
  `
  <h1><wbr>正则表达式</h1>

  Content is divided into two sections;

  <h2>subTitle</h3>

  another line`

![image | center](http://images2015.cnblogs.com/blog/1073915/201702/1073915-20170220151241491-1413862142.png "")

这样子并不合法，所以我们要做的便是利用回溯引用来解决这个问题

**回溯引用匹配 · 基本知识点**
    1.（x）匹配 'x' 并且记住匹配项。括号被称为 _捕获括号_。**  
**
    2. 回溯引用只能引用子表达式（即捕获括号（）括起的正则表达式片段）
    3. \   用于标识回溯引用， \1 对应第1个子表达式，\2 对应第2个子表达式，以此类推，\0对应整个正则表达式。
（但是在替换操作中，必须使用$代替\）
 　看了这些知识点，还是来点例子，容易记一些~
** 1.我们继续看看上面那个例子，如果换成下面的正在表达式**
```
var
 re = /<[hH]([1-6])>.*?<\/[hH]\1>/g;
```

![image | center](http://images2015.cnblogs.com/blog/1073915/201702/1073915-20170220153408585-2017903965.png "")

这一次总算是正确了
**3. 再看freecodeCamp上的一道题，原题链接 ：**[**here**](https://www.freecodecamp.com/challenges/spinal-tap-case)**. **
Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
比如： spinalCase("AllThe-small Things") shouldreturn"all-the-small-things"
```
function
 spinalCase(str) {
  
//
 "It's such a fine line between stupid, and clever."
//
 --David St. Hubbins

  str = str.replace(/[^a-zA-Z]/g, '-'
)
    .replace(
/\B[A-Z]\B/g, '-$&'
);
  
return
 str.toLowerCase();
}
```

在这里，使用了回溯引用替换，$& 代表匹配的字符串

## 正则匹配中的特殊字符

正则中存在一些特殊字符,需要通过`\`转义,总结如下:
```js
* . ? + $ ^ [ ] ( ) { } | \ /
```
- 正确使用方法: `\*`, `\.` 等等