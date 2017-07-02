---
layout: post
title: 基于hash和pushState的网页前端路由实现
tag: 前端
---

<b>客户端路由<b>

对于客户端（通常为浏览器）来说，路由的映射函数通常是进行一些DOM的显示和隐藏操作。这样，当访问不同的路径的时候，会显示不同的页面组件。客户端路由最常见的有以下两种实现方案：
* 基于Hash
* 基于History API

(vue-router)[https://router.vuejs.org/zh-cn/essentials] 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

基于Hash的路径有：
```
http://test.com/
http://test.com/#/foobar
```
URL中#以及后面的部分都是hash。
```
const url=require('url')
var a=url.parse('http://test.com/a/b/#/foo/bar')
console.log(a.hash)
// => #/foo/bar
```
hash仅仅是客户端的一个状态，也就是说，当向服务器发请求的时候，hash部分并不会发过去。

HTML5新添了onhashchange事件给window对象，在Ajax应用中，开发人员通过利用url参数列表保存状态或导航信息。通过监听这个事件，可以实现简单的路由
```
EventUtil.addHandler(window,"hashchange",(event)=>{
  console.log("Old Url: "+event.oldURL+" New Url:　"+event.newUrl+" Current hash: "+window.location.hash);
  var path=hash.substring(1);//去掉 # 号
  })

```
<small>EventUtil 在此前介绍过的一个事件处理工具类</small>

使用一下代码检测浏览器是否支持hashchange()事件
```
var isSupported= ("onhashchange" in window)&&
(document.documentMode === undifined || document.documentMode>7);//IE8+才支持

```

基于History API的路径有：
```
http://test.com/
http://test.com/foobar
```
TODO:待补充

当直接访问http://example.com/的时候，两者的行为是一致的，都是返回了index.html文件。

当从http://example.com/跳转到http://example.com/#/foobar或者http://example.com/foobar的时候，也都是正常的，因为此时已经加载了页面以及脚本文件，所以路由跳转正常。

当直接访问 `http://example.com/#/foobar` 的时候，实际上向服务器发起的请求是`http://example.com/`,因此会首先加载页面及脚本文件，接下来脚本执行路由跳转,一切正常。



当直接访问`http://example.com/foobar`的时候，实际上向服务器发起的请求也是`http://example.com/foobar`，然而服务器端只能匹配`/`而无法匹配`/foobar`，因此会出现404错误。
因此需要对服务器路由映射进行改造.

比如,在Express中进行静态路由映射 或者 动态路由映射
```
app.get('/user',(req,res,next)=>{
  // ...do something
  });
  app.get('/user/:id',(req,res,next)=>{
    // ...do something
    // var id=req.query.id;
    });
```
