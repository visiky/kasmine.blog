---
layout: post
title: Reflect & Proxy in es6
# category: ES6
---

## Reflect

> 静态方法**`Reflect.defineProperty()`** 基本等同于[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty "Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。")方法，唯一不同是返回 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean "此页面仍未被本地化, 期待您的翻译!")值。


从广知师兄的周报中学习到: :open_mouth:
* ios9下，window.name为非configurable


```javascript
window._name = window.name;
Object.defineProperty(window,'name', {
  get() {return window._name; },
  set(v) { window._name=v; },    
});
```

* Reflect还存在着浏览器兼容性问题


## Proxy

* 语法

```javascript
const target = {}, handler = {};
const proxy = new Proxy(target, handler);

// 无操作转发代理，代理会将应用到它的操作转发到这个对象上
new Proxy(target, {});
```

* Proxy 的功能，将代理的所有内部方法转发至目标，但是proxy!==target

```javascript
const target = {}, handler = {};

const proxy = new Proxy(target, handler);

proxy.color = 'pink';

console.log(proxy, target, proxy === target); 
// { color: pink } 
// { color: pink }
// false
```

* 魔法handler

```javascript
handler = {
    set: (target, key, value, receiver) => {
        throw new Error('Dont setProperty to object');
    }
}
proxy.color = 'pink'; // Uncaught Error
```

### Proxy的应用
* 请阅读: [http://www.zcfy.cc/article/6-compelling-use-cases-for-es6-proxies-888.html](http://www.zcfy.cc/article/6-compelling-use-cases-for-es6-proxies-888.html)
* 即时撤销对敏感数据的访问

```javascript
let sensitiveData = {  
  username: 'devbryce'
};
 
const { proxy, revoke }  = Proxy.revocable(sensitiveData, {});
 
function handleSuspectedHack(){  
  // Don't panic
  // Breathe
  revoke();
}
 
// logs 'devbryce'
console.log(proxy.username);
handleSuspectedHack();
try {
  // TypeError: Revoked
console.log(proxy.username);
} catch (e) {
  console.log(e.toString());
}
// OK
console.log(sensitiveData.username);
```
* <span style="background-color:#FFF9D8;">防止不必要的资源消耗操作 </span>
  * <span style="color:#E4965B;">NOTE</span> 在一些地方可以考虑使用这种方式来进行缓存操作

```javascript
let obj = {  
  getGiantFile: function(fileId) {/*...*/ }
};

obj = new Proxy(obj, {  
  get(target, key, proxy) {
    return function(...args) {
      const id = args[0];
      let isEnroute = checkEnroute(id);
      let isDownloading = checkStatus(id);      
      let cached = getCached(id);

      if (isEnroute || isDownloading) {
        return false;
      }
      if (cached) {
        return cached;
      }
      return Reflect.apply(target[key], target, args);
    }
  }
});
```
