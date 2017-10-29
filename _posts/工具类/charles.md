---
layout: post
title: charles - 网络调试代理工具
---

![]({{site.imgurl}}/in-post/test-utils/charles-1.png)
![]({{site.imgurl}}/in-post/test-utils/charles-2.png)
![]({{site.imgurl}}/in-post/test-utils/charles-3.png)


> charles: 网络调试代理工具


## 必备招式

* [x] map remote
* [x] map local
* [x] rewrites
* [x] https 调试 / 移动调试
* [ ] 网速模拟
* [x] request/response 替换


## 如何使用？

1. 从[官网](https://www.charlesproxy.com/download/)上下载,然后注册一下
2. 将Charles设置成系统代理  
   Proxy -> Mac OS X Proxy  
   ![]({{site.imgurl}}/in-post/test-utils/charles-1.png)
3. Recording Settings

> 配置Charles记录行为


* Include


记录你要截取记录的url

![]({{site.imgurl}}/in-post/test-utils/charles-2.png)


1. 然后可以开始啦


* **抓包**


chrome浏览器装了SwitchyOmega一类的东西，  
-> 选项 -> 设置如下  
![]({{site.imgurl}}/in-post/test-utils/charles-3.png)
  
这样子，当我们选择SwitchyOmega的本地映射的时候（或者选择系统代理，因为我们已经在上面设置了charles为系统代理），charles就可以截取到当前的网络请求，然后可以根据我们的需要进行修改请求/响应  
![]({{site.imgurl}}/in-post/test-utils/charles-4.png)


* **使用auto-switch模式**
 
  不过呢，上面那种做法还可以继续变换。那样子相当于整个chrome都开启了本地映射，charles就会截取所有的请求，而不仅仅是这个host下的请求。  
  那么，让我们看看下一种情景模式 – **auto-switch**情景。通过不同的条件设置，我们可以选择不同的情景模式  
  ![]({{site.imgurl}}/in-post/test-utils/charles-5.png)
  
  然后，我们重新选择一下，就可以发现charles现在只截取 [host为me-momo.github.io](http://xn--hostme-momo-k68q.github.io) 下的请求了  
  ![]({{site.imgurl}}/in-post/test-utils/charles-6.png)

 
* **Rewrite功能**


> Rewrite 功能适合对某一类网络请求进行一些正则替换，以达到修改结果的目的


既然抓到包了，我们就来捣蛋一下

![]({{site.imgurl}}/in-post/test-utils/charles-7.png)


* **给服务器做压力测试**


在需要的网络请求上右击，然后选择「Repeat Advanced」菜单项，如下所示：

![]({{site.imgurl}}/in-post/test-utils/charles-8.png)


* **Charles显示模式**
 
  * Structure模式的优点 :  
    以域名划分请求信息 可以很容易定位需要分析和处理的数据。  
    清晰看请求的数据结构
 
  * Sequence模式的优点 :  
    请求快就在前面显示, 因为这里是以数据请求的顺序去执行的  
    可以很清晰的看到全部请求,(包括资源请求,图片,文本,音乐等等)

 
* **移动端的一个设置（IPhone)**


![]({{site.imgurl}}/in-post/test-utils/charles-9.png)


服务器为charles所在电脑的IP地址（通过 ternimal -> ifconfig | grep "inet " | grep -v 127.0.0.1 可获取）  
端口为上面配置的charles Proxy Setting 的端口

![]({{site.imgurl}}/in-post/test-utils/charles-10.png)


然后就可以截取移动端的网络请求了

## 推荐

上面介绍不是很全面，简单入门，覆盖我们一般会使用的功能，具体可以查看官方文档

* [iOS开发工具——网络封包分析工具Charles](http://www.infoq.com/cn/articles/network-packet-analysis-tool-charles)

