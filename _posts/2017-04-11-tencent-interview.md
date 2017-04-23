---
layout: post
title: 腾讯春招一面
tags: [面试]
---

# 前言
今天去面试了腾讯前端开发,怎么说呢，人还是很多的，但是由于自己没有一丝丝准备就前去，想着自己的前端基础还是可以的，就没怎么准备，结果面试的时候大都是一些计算机基础的问题，所以面试结果有点惨(半个月前面试的话，估计就不会是这种状态了)，下面我大概整理一下今天面试的内容 /(ㄒoㄒ)/~~

# 正文

首先,自我介绍,然后开始提问~
## 问题集合和解答

#####   堆和栈的区别

  **Answer**&emsp;
  
  栈区(stack)--由编译器自动分配释放
  
  堆区(heap) --由程序员分配释放，若程序员不释放，程序结束后可能有os回收

  只要栈的剩余空间大于所申请空间，系统将为程序提供内存，否则报栈溢出错误。OS中有一个记录内存空闲地址的链表，当系统收到程序申请的时候，会遍历链表，寻找一个空间大于所申请空间的堆结点，然后将结点从空闲结点链表删除，并将结点的空间分配给程序。

#####   TCP连接过程(为什么要四次挥手,谁先关闭连接,TIMED WAIT的作用)

  **Answer**&nbsp;
  建立连接(三次握手)就不说了，看下图

  ![TCP三次握手过程]({{site.imgurl}}/in-post/TCP-connect.png)

  断开连接(四次挥手)

  ![TCP三次握手过程]({{site.imgurl}}/in-post/TCP-disconnect.png)

   解释:<br/>
   (1) TCP客户端发送一个FIN，关闭客户端到服务器端的数据传送。（客户端不再发送报文给服务器端，但可接受服务器端报文<br/>(2) 服务器收到这个FIN，它发回一个ACK，确认序号为收到的序号加1。<br/>
   (3) 服务器关闭客户端的连接，发送一个FIN给客户端。（服务器端关闭到客户端的数据传送）<br/>
   (4) 客户段发回ACK报文确认，并将确认序号设置为收到序号加1。

   最后，我找到了一幅很好形容这个过程的图,我们来看一下:

   ![TCP 状态机]({{site.imgurl}}/in-post/TCP-state.png)

   <b class='text-red'>重要:</b><br/>
   <b class='text-red'>四次挥手释放连接时，等待2MSL的意义</b><br/>
   第一，为了保证A发送的最有一个ACK报文段能够到达B。这个ACK报文段有可能丢失，因而使处在LAST-ACK状态的B收不到对已发送的FIN和ACK报文段的确认。B会超时重传这个FIN和ACK报文段，而A就能在2MSL时间内收到这个重传的ACK+FIN报文段。接着A重传一次确认。<br/>
   第二，就是防止上面提到的已失效的连接请求报文段出现在本连接中，A在发送完最有一个ACK报文段后，再经过2MSL，就可以使本连接持续的时间内所产生的所有报文段都从网络中消失。

  **状态说明**

  FIN WAIT1:应用程序说他已经结束连接了<br/>
  FIN WAIT2:另一方已经同意释放连接<br/>
  TIMED WAIT:等待所有分组逐渐消失<span class="text-red">(两倍报文传送时间)</span><br/>
  CLOSING:双方试图同时关闭连接<br/>
  CLOSE WAIT:另一方已经发起释放连接的过程<br/>
  LAST ACK:等待所有的分组逐渐消失<br/>

#####   HTTP报文形式

  **Answer**&nbsp;

  **HTTP请求报头**
  包括三个部分：请求行,请求头部,请求包体
  <p class="text-red">高能预警：空行在请求头部和请求包体之间</p>

  ![HTTP请求报头]({{site.imgurl}}/in-post/http-request-header.png)

  根据上图，举个实际例子吧

  ```
  GET http://www.test.com/index.html HTTP/1.1 
  Accept-Encoding: 客户端可接受的编码压缩格式;
  Referer: 
  User-Agent: 用户代理(浏览器类型)

  请求包体：在POST方法中使用(与之相关的包体类型:Content-Type && Content-Length)
  ```

  **HTTP响应报头**

  ![HTTP响应报头]({{site.imgurl}}/in-post/http-response-header.png)


  ```
  HTTP/1.1 200 OK
  cache-control:private,max-age=0,no-cache,no-store
  connection:Keep-Alive
  content-length:
  content-type:
  date:
  etag:
  expires:
  server:
  ```

  **状态码**

  302和304的区别!!!
  <p class='text-red'><b>302</b>：临时重定向(指出被请求文档已被临时移动到别处,此文档的新的URL在Location响应头中给出)</p>

  **307**(Internal Redirect)
#####   http缓存机制,有几种

  **Answer**&nbsp;

  http缓存:判断expires,Etag,last-modified

  浏览器缓存：九种
  
  详细看这一篇 [浏览器http缓存机制]({{site.baseurl}}/2017/04/11/浏览器http缓存机制)

#####   输入URL之后的过程(主要在于页面构建DOM树和渲染树之后还有什么,这里回答的不好= =)

  **Answer**&nbsp;

#####   HTTP和HTTPs区别

  **Answer**&nbsp;

#####   web安全有哪些

  **Answer**&nbsp;

  主要讲一下 XSS(跨站脚本注入)和CRSF(跨站伪造身份攻击)这两个问题

#####   介绍一下自己的项目吧(更看重你使用的技术栈=> 要能够清晰描述一下自己项目的技术栈 => 待加强)

  **Answer**&nbsp;

#####   vue底层机制(=> 需要去了解源码实现,最好是模仿源码写个小demo)

  **Answer**&nbsp;

#####   观察者和订阅者模式代码(上题自己挖坑,手写代码能力,跪,/(ㄒoㄒ)/~~)

  **Answer**&nbsp;
  参考一下：eventProxy.js 的实现吧～
  ```javascript
  'use strict';
  const eventProxy = {
    onObj: {},
    oneObj: {},
    on: function(key, fn) {
      if(this.onObj[key] === undefined) {
        this.onObj[key] = [];
      }

      this.onObj[key].push(fn);
    },
    one: function(key, fn) {
      if(this.oneObj[key] === undefined) {
        this.oneObj[key] = [];
      }

      this.oneObj[key].push(fn);
    },
    off: function(key) {
      this.onObj[key] = [];
      this.oneObj[key] = [];
    },
    trigger: function() {
      let key, args;
      if(arguments.length == 0) {
        return false;
      }
      key = arguments[0];
      args = [].concat(Array.prototype.slice.call(arguments, 1));

      if(this.onObj[key] !== undefined
        && this.onObj[key].length > 0) {
        for(let i in this.onObj[key]) {
          this.onObj[key][i].apply(null, args);
        }
      }
      if(this.oneObj[key] !== undefined
        && this.oneObj[key].length > 0) {
        for(let i in this.oneObj[key]) {
          this.oneObj[key][i].apply(null, args);
          this.oneObj[key][i] = undefined;
        }
        this.oneObj[key] = [];
      }
    }
  };

  export default eventProxy;
  ```

#####   介绍闭包(谈到了闭包的缺点,顺带下题)

  **Answer**&nbsp;[!!!如何解决闭包问题]

#####   js垃圾回收机制

  **Answer**&nbsp;
  主要有两种:标记清除和引用计数.

  **标记清除** 当函数执行完毕时,则会被标记为"离开环境"
  **引用计数** 当声明一个变量,以及将一个引用变量赋值于它的时候，引用计数为1.如果同一个值又赋给另一个变量的时候，引用计数+1.每次垃圾收集器运行的时候，会遍历所有对象，清除引用次数为0的值所占的内存.

  **管理内存** 一旦数据不再使用,最好将其置为null,来释放引用---解除引用.<span class="text-red">解除引用，并不代表着自动回收了该值所占用的内存,而是让值脱离执行环境,以便垃圾收集器下次运行时将其回收</span>

  TODO：解决 **循环引用**，**内存泄漏** 问题

#####   值类型和引用类型的区别

  **Answer**&nbsp;

#####   深拷贝和浅拷贝的区别

  **Answer**&nbsp;

#####   性能问题(=>挖坑：DOM repaint和reflow会因为什么性能瓶颈)

  **Answer**&nbsp;

