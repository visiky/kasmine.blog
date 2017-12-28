---
layout: post
title: 前端每周清单（2017/06/22 ～ 06/29）
# category: 
tag: 
--- 

# 前端每周清单


- [ ] http://www.infoq.com/cn/news/2017/06/Front-end-weekly-18?utm_campaign=rightbar_v2&utm_source=infoq&utm_medium=news_link&utm_content=link_text

## 待读清单

- [ ] [现代Web开发魔法书](https://github.com/dexteryy/spellbook-of-modern-webdev)


## 已看清单

- [x] 用好javascript Console
- [x] [开源项目 collect.js](https://github.com/ecrmnn/collect.js/)
- [x] [《JavaScript 内存管理速成》](https://hacks.mozilla.org/2017/06/a-crash-course-in-memory-management/)

## 阅读笔记

### 使用好 Console

```javascript
- console.log console.debug console.info console.warn // 不同的颜色区分而已

- console.table 

- console.time  console.timeEnd

- console.assert() // 类似于单元测试中的断言，当表达式为 false 时，输出错误信息

- console.count() // 调试代码时，我们经常需要知道一段代码被执行了多少次，我们可以使用 console.count() 来方便的达到我们的目的。
```


### 开源项目 [collect.js](https://github.com/ecrmnn/collect.js/)

* 使用 javascript 实现 [Laravel Collections API](https://laravel.com/docs/5.4/collections)

> provide a fluent and convenient way to work with data of array

* 集合是不可变的，意味着每个Collection方法都返回一个全新的Collection实例。

* 实现：

    - 声明一个 Collections 对象，然后在其原型上实现各种方法，利用new this.constructor()返回一个新的实例

```javascript
function Collections(collections) {
    this.items = collections || []
}
Collections.prototype[methodName] = function() {
    let collections = this.items~~~~

    return new this.constructor(collections);
}
//  📒 为了变成可遍历对象， 一个对象必须实现 @@iterator 方法, 意思是这个对象（或者它原型链prototype chain上的某个对象）必须有一个名字是 Symbol.iterator 的属性
Collection.prototype[Symbol.iterator] = require('./methods/symbol.iterator');
/**
 *   ./methods/symbol.iterator.js 
 *   refer to ：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols
**/
module.exports = function SymbolIterator() {
  let index = 0;

  return {
    // 当一个对象被认为是一个迭代器时，它实现了一个 next() 的方法并且拥有以下含义: done && value
    next: function() {
      return {
        value: this.items[index++],
        done: index > this.items.length,
      };
    }.bind(this),
  };
};

export function(collections) {
    // 帮你 new 一个实例，通过 require 直接可以取得
    return new Collections(collections);
}

```

* 列举某些API 方法

    - The `[macro](https://github.com/ecrmnn/collect.js#macro)` method lets you register custom methods




### 《JavaScript 内存管理速成》

> 本篇文章使用漫画的形式介绍了 JavaScript 中内存管理的相关知识
> 首先介绍了 JavaScript 与 C 这两个风格迥异的语言是如何进行内存管理的，然后讨论了 ArrayBuffers 与 ShardArrayBuffurs 存在的意义以及可能引起的临界情况，最后讨论了在未来 WebAssembly 开发中应该如何使用 Atomics 来处理并发情况下的临界情况。

* 📒 

* Memory-managed-language
    - 如 javascript 语言，代码不直接涉及到内存管理的语言
    - JS 引擎会帮我们自动管理内存，当变量不再使用的时候，gabage Collection 会帮我们自动清理

* 与之比较的，如 C 语言，需要使用 malloc 申请内存空间，runtime会在一张free-list（空闲地址列表）寻找可用的地址，然后分配。当使用完这些地址空间的时候，需要使用 free 来释放空间，重新加入到 free-list中

* 📒 [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) with  [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)

TODO: 还没有领悟到真正重要部分 ～

* 当我们创建一个变量的时候，JS引擎由于会猜测这个变量的类型，所以会预留空间，导致变量占有的空间比实际所需空间偏大（造成空间浪费）

* 在很多编程语言中，使用 线程 来分割一份工作，而在Javascript编程语言中，通常会使用 web Worker来完成这件事情（通过postMessage来完成）。web Worker不能共享内存空间，通常使用同一块内存空间（menory）来读取数据（每一个worker都可以理解访问这块空间，这就可能产生冲突conflict）


* **分配共享内存**

> 由两个SharedArrayBuffer对象引用的共享数据块是相同的数据块，并且一个代理中的块的副作用最终将在其他代理中变得可见。 
TODO: 如何理解 

```javascript
var sab = new SharedArrayBuffer(1024);
worker.postMessage(sab);
```

* `SharedArrayBuffer` 涉及的 `Atomic`（原子操作）

TODO:

* 附：[MDN 内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)

> 诸如 C 语言这般的低级语言一般都有低级的内存管理接口，比如 malloc() 和 free()。而另外一些高级语言，比如 JavaScript， 其在变量（对象，字符串等等）创建时分配内存，然后在它们不再使用时“自动”释放。后者被称为垃圾回收。

* JavaScript 实现的垃圾回收算法

 - 引用计数垃圾回收算法
    - 如果没有引用指向该对象（零引用），对象将被垃圾回收机制回收。
    - 限制：循环引用（如何用实例说明！！！）⚠️
 - 标记 - 清除算法
    - 从2012年起，所有现代浏览器都使用了标记-清除垃圾回收算法
    - 定期的，垃圾回收器将从根（JavaScript中，根对象是全局对象）开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和所有不能获得的对象

TODO: 查看 webkit内核源码的实现


