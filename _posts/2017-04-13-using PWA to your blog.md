---
layout: post
title: 使用PWA改造博客网站
tags: [PWA]
---


# 渐进增强的PWAs(progressive Web Apps)

相信大家都听说过了吧,相关内容越来越热,已经不是一个遥不可及的东西了,饿了么大前端团队也开始投入PWAs的开发

> PWA极大提升了移动端的表现,改善了用户体验
> 只需要W3c的web开发技术，即可开发一个app，不需要多客户端开发
> 不需要通过AppStore安装下载app,app会自动升级，不需要用户自己升级
> Chrome提供了可选选项，使得PWA可以全屏体验
> 必要的文件会被本地缓存，因此会比web app快，甚至比 native app快
> 网站的数据传输必须是https连接
> PWAs可以离线工作,并且在网络恢复时可以同步最新数据 

## 开始

#### 开启https

HTTPS 在示例中并不是必须的，因为 Chrome 允许使用 localhost 或者任何 127.x.x.x 的地址来测试。你也可以在 HTTP 连接下测试你的 PWA，你需要使用 Chrome ，并且输入以下命令行参数：

```bash
--user-data-dir

--unsafety-treat-insecure-origin-as-secure
```

#### 创建 Web App Manifest

下面是我的示例 `manifest.json` 文件
```json
{
  "name": "Kasmine Blog",   // 网页显示给用户的完整名称
  "short_name": "Kasmine Blog", // 空间不足时，显示的网站名称缩写

  "description": "",          // 网站的详细描述
  "icons": [{
    "src": "icons/128.png",
    "sizes": "128x128",
    "type": "image/png"
  }, {
    "src": "icons/512.png",
    "sizes": "512x512",
    "type": "image/png"
  }],
  "background_color": "#fff",   // 启动屏和浏览器的背景颜色
  "theme_color": "#000",
  "start_url": "/kasmine.blog/",
  "display": "standalone",
  "orientation": "portrait"
}
```

### 创建Service Worker

Servive Worker 是拦截和响应你的网络请求的编程接口(位于根目录下)

检查是否支持 ServerWorker 并且注册：
```
if(navigator.serverWorker){
    navigator.serverWorker.register('/sw.js')
                            .then((registration)=>{ conosle.log("serverWorker registered："+registration)})
                            .catch((error)=>{});
}
```

**Service Worker**可以拦截网页请求，包括页面切换，静态资源下载，ajax请求(因此需要https)

Service Worker有三个事件:`install`,`activate`和`fetch`

#### Install事件

这个事件在app被安装时触发。它经常用来缓存必要的文件。缓存通过 Cache API 来实现。

几个主要变量:
* 缓存名称`CACHE`和版本号`version`。你的应用可以有多个缓存但是只能引用一个。我们设置了版本号，这样当我们有重大更新时，我们可以更新缓存，而忽略旧的缓存。
* 一个离线页面的URL`offlineURL`。当离线时用户试图访问之前未缓存的页面时，这个页面会呈现给用户。
* 一个拥有离线功能的页面必要文件的数组（installFilesEssential）。这个数组应该包含静态资源，比如 CSS 和 JavaScript 文件，但我也把主页面（/）和图标文件写进去了。如果主页面可以多个URL访问，你应该把他们都写进去，比如/和/index.html。注意，offlineURL也要被写入这个数组。
* 可选的，描述文件数组（installFilesDesirable）。这些文件都很会被下载，但如果下载失败不会中止安装。

```javascript
const version="1.0.0",
  CACHE="precache."+version,
  RUNTIME="runtime",
  ROOT="/kasmine.blog",
  ASSETS=`${ROOT}/assets`
  HOSTNAME_WHITELIST=[self.location.hostname],
  offlineURL=`${ROOT}/offline.html`,
  installFilesEssential=[
    `${ASSETS}/img/Calendar.svg`,
    `${ASSETS}/img/home-bg.jpg`,
    `${ASSETS}/img/avatar-kasmine.jpg`,
    `${ROOT}/pwa/manifest.json`
  ].concat(offlineURL),
  installFilesDesirable=[
    `${ASSETS}/img/404-bg.jpg`
  ];

```

使用Promise [cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache),添加文件到缓存
```javascript
function installStaticFiles(){
      
      return caches.open(CACHE) // create a new cache
        .then(cache=>{
          /**
          *　@param {array} request URLs
          **/
          cache.addAll(installFilesDesirable);
          return cache.addAll(installFilesEssential);
        })
}
```
`CACHA API`大部分方法都返回一个`{PROMISE}`对象

``` javascript
/**
 *  @Lifecycle Install
 *  waitUntil() : installing ====> installed
 *  skipWaiting() : waiting(installed) ====> activating
 */
self.addEventListener('install', e => {

  /* cache core files */
  e.waitUntil(
    installStaticFiles()
    .then(cache => 
        self.skipWaiting())
  );
});
```
添加install事件监听事件,waitUntil方法确保所有代码执行完毕，service worker才会执行install，生命周期从installing到installded.接着执行activate事件。

#### Activate事件

当install完成之后,service worker进入active状态，这个事件立即执行
**在这个事件监听中，我们可以删除老旧的无用缓存文件**
```javascript
function clearCaches(){
  return caches.keys()
    .then(keylist => {
      return Promise.all(
        keylist.filter(key => key!=CACHE)
        /**
        * @param cache entry
        */
        .map(key => caches.delete(key))
      );
    });
}
self.addEventListener("activate",event => {
  console.log("service worker :activated");

  event.watiUtil(
    clearOldCaches()
    // 设置本身为 active 的service worker　?TODO:作用?
    .then(() => self.clients.claim())
  );
  // 这里如果你想缓存所有浏览过的,那么就不要 clearOldCaches,直接
  // self.clients.claim()
})
```
#### Fetch事件

```javascript

self.addEventListener('fetch', event => {

 // Skip  non-GET requests and some of cross-origin requests, like those for Google Analytics. 
 if(event.request.method!=="GET" || HOSTNAME_WHITELIST.indexOf(new URL(event.request.url)
      .hostname) ==-1) return;

  // logs for debugging
  // console.log(`fetch ${event.request.url}`);
  const cached=caches.match(event.request);
  const fetched=fetch(event.request,{
    cache:"no-store"
  });
  const fetchedCopy=fetched.then((response)=>response.clone());
  // check if there is something in cache
  // if not,about to fetch from network
  // if neither yields a response,return offline-pages
  // USE PROMISE!
  event.respondWith(
    Promise.race([fetched.catch(()=>cached),cached])
      .then(response=> response||fetched)
      .catch(()=>caches.match(offlineURL))
  );

// Update the cache with the version we fetched (only for ok status)
    event.waitUntil(
      Promise.all([fetchedCopy, caches.open(RUNTIME)])
      /**
       * The put() method of the Cache interface allows key/value pairs to be added to the current Cache object. @param {URL,RESPONSE}
       */
      .then(([response, cache]) => response.ok && cache.put(event.request,
        response))
      .catch(()=> { /* eat any errors */ })
    );

});
```



### 最后，我们来检查一下我们搭建的效果

`jekyll server` 开启博客本地服务器
`Ctrl`+`C` 或者 开发者工具->NetWork->Application->Service Workers 点击`offline`

Application->Cache->Cache Storage 检查缓存内容，当你进入没有缓存的页面的时候，会自动加载`offline.html` 页面

![]({{site.imgurl}}/in-post/pwa/cache-storage1.png)
![]({{site.imgurl}}/in-post/pwa/cache-storage2.png)
![]({{site.imgurl}}/in-post/pwa/cache-storage3.png)
![]({{site.imgurl}}/in-post/pwa/cache-storage4.png)

### PWA 需要注意的一点:

#### 缓存太多

也许你需要注意：

* 只缓存重要的页面，类似主页，和最近的文章。

* 不要缓存图片，视频和其他大型文件

* 经常删除旧的缓存文件

* 提供一个缓存按钮给用户，让用户决定是否缓存

#### 缓存刷新

用户在请求网络前先检查该文件是否缓存。如果缓存，就使用缓存文件。这在离线情况下很棒，但也意味着在联网情况下，用户得到的可能不是最新数据。因此我们要设置一个缓存时间
```
Cache-Control:max-age=86400
```