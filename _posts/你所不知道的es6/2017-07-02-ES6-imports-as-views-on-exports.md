---
layout: post
title: ES6:imports as views on exports
category: ES6
--- 

## ES6 和 CommonJS 

- CommonJS和ES6中的导入工作不同：
    + 在CommonJS中，导入是导出值的副本。
    + 在ES6中，导入是导出值的实时只读视图。

### 具体差异说明

- **CommonJS（Node.js）**

如果将值导入到变量中，则该值将被复制两次：一次导出（A行）并导入一行（B行）

```js
//------ lib.js ------
var counter = 3;
function incCounter() {
    counter++;
}
module.exports = {
    counter: counter, // (A)
    incCounter: incCounter,
};

//------ main1.js ------
var counter = require('./lib').counter; // (B)
var incCounter = require('./lib').incCounter;

// The imported value is a (disconnected) copy of a copy
console.log(counter); // 3
incCounter();
console.log(counter); // 3  —— 并没有改变，因为导出的时候是通过复制导出的

// The imported value can be changed
counter++;
console.log(counter); // 4
```

- **ES6 Modules**

    + 与CommonJS相反，导入是导出值的视图。换句话说，每次导入都是与导出的数据的实时连接。导入为只读
    + ES6模块是动态引用，不存在缓存值的问题，而且模块里面的变量，绑定其所在的模块

```js
//------ lib.js ------
export let counter = 3;
export function incCounter() {
    counter++;
}

//------ main1.js ------
import { counter, incCounter } from './lib';

// The imported value `counter` is live
console.log(counter); // 3
incCounter();
console.log(counter); // 4  —— 导出和导入是实时连接的

// The imported value can’t be changed
counter++; // TypeError
```


请注意，当您不能更改导入的值时，可以更改它们所引用的对象。例如

```js
//------ lib.js ------
export let obj = {};

//------ main.js ------
import { obj } from './lib';

obj.prop = 123; // OK
obj = {}; // TypeError
```

### 为什么采用新的导入方式？

1. 默认导出是有利的
2. 静态模块结构
3. 同时支持同步和异步加载
4. 支持模块之间的循环依赖性

    虽然不是很支持出现循环依赖，但是有的时候，循环依赖又是不可少的。
    
> ES6根本不会关心是否发生了"循环加载"，只是生成一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值

关于循环依赖加载，可以看看这篇文章 👉 [JavaScript 模块的循环加载](ttp://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)

### 导出视图


|声明	|  本地名称  |导出名称|
|:---|:---|:---|
| export  {v};  |	'v' |'v'|
| export  {v as x};	|   'v' |   'x'|
| export  const v = 123;    |'v'    |   'v'|
| export  function f() {}   |'f'   |  'f'|
| export  default function f() {}   |   'f' |	'default'|
| export  default function () {}  | '*default*' |'default'|
| export  default 123;  |	'*default*'     |   'default'|






## 推荐阅读

- [ES6 Modules](http://exploringjs.com/es6/ch_modules.html#sec_imports-as-views-on-exports)

- [JavaScript 模块的循环加载](ttp://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)