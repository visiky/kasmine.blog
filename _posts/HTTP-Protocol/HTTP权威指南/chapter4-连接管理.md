---
layout: post
date: 2017/10/27
title: HTTP权威指南 - 连接管理（1）
tags: HTTP
---

知识点:
- HTTP如何使用TCP连接
- TCP连接的时延、瓶颈以及存在的障碍

浏览器输入一个URL后发生的事情(面试题目)
- []({{site.imgurl}}/in-post/HTTTP/http-connection.png)

- TCP为HTTP提供了一条可靠的传输管道

## TCP流是分段的，由IP分组传送

- TCP的数据是通过名为IP分组的小数据来发送的
- HTTP是`HTTP over TCP over IP`协议栈的最顶层，而HTTP是则是在中间添加了TSL／SSL加密层
  - []({{site.imgurl}}/in-post/HTTTP/http-https-protocol-stack.png)


**【回答】HTTP如何使用TCP连接**
HTTP要传送一条报文时，会以流的形式将报文数据的内容通过一条打开的TCP按序传输。TCP收到数据流之后,会将数据流砍成**段**的小数据块，并**将段封装到IP分组**中，通过因特网传输


每个TCP段都是由IP分组承载，从一个IP地址发送到另一个IP地址。每个IP分组中包括:
- 一个IP分组首部(20bytes)
- 一个TCP段首部(20bytes)
- 一个TCP数据块(0 or more bytes)

## 保持TCP连接持续不断的运行

- 通过`端口号`来保持。`源IP地址 —— 端口号 - 目的IP地址`确定一条连接

## 对TCP性能的考虑

HTTP事务的性能很大程度上取决于底层TCP通道的性能

### HTTP事务的时延

- []({{site.imgurl}}/in-post/HTTTP/time-delay-of-http.png)

**【问题】请根据上图总结HTTP事务时延的几个主要原因**

### 性能聚焦区域

- **目的:** 为HTTP程序员解决TCP相关时延问题
- **主要因素:**
  - TCP三次握手连接
  - TCP慢启动拥塞控制
  - 数据聚焦的Nagle算法
  - 用于捎带确认的TCP延迟确认算法
  - TIME_WAIT时延和端口耗尽

<!-- TODO -->
主要内容请看[HTTP权威指南 - 4.2.2节～4.2.7节]

## 对HTTP连接的处理

### 关于Connection头部的理解

- 语法
```js
Connection: keep-alive
Connection: close // 表示客户端或服务端想要关闭此链接,响应结束后连接会被关闭
Connection: #12344 // connection-token
```

### 串行事务处理时延

举个例子：有一个包含3个嵌入图片的Web页面，浏览器需要发起4个事务来显示页面(如果每个事务都要建立一条新的连接,那么连接时延和慢启动时延就会叠加)

- []({{site.imgurl}}/in-post/HTTTP/serial-http-transaction.png)

**几种提供HTTP连接性能的方法**
- 并行连接
- 持久连接
- 管道化连接

相关的内容看下一部分[HTTP权威指南 - 连接管理（2）]()～～