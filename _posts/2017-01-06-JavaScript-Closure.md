---
layout: post
title: 闭包
tags: JavaScript
---


闭包（closure）是Javascript语言的一个难点，也是它的特色，很多高级应用都要依靠闭包实现。学习这么久以来,还是觉得有点难度，所以今天来写一下笔记~

## 变量的作用域和作用域链
[TODO]:这个是很重要的概念，需要一个专题来说明

要理解闭包，首先必须理解Javascript特殊的变量作用域。
- 函数内部的对象可访问外部的全局变量

- 函数外部的变量则不能访问内部的局部变量

- 当你在函数内部定义变量的时候，记得加上var

  如果在函数内部定义变量的时候没有加上var,则相当于定义了一个全局变量。

  在严格模式下，不允许没有var定义变量



## 闭包 VS 匿名函数

- 一般来说，函数内定义的局部变量在函数执行完毕就会被销毁,内存中只保存全局变量,但是闭包的活动对象却仍保存在内存中

  (在此说明,因为闭包可能会导致占用内存过多的现象,因此慎重过多使用闭包)

```
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
 };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = makeSizer(14);
document.getElementById('size-16').onclick = size16;

document.getElementById('size-14').onclick =function(){
  makeSizer(14);
}
```
  <div class='tips'>makeSizer函数内部定义了一个闭包,定义size12、size14、size16的时候，虽然makeSizer()执行完毕被销毁，但是闭包的作用域还存在，并且闭包会记得当时的上下文环境变量，也就是说每个闭包都还保存着不同的size值</div>

### 几个注意点：
- 闭包只保存包含函数中任何变量的最后值

```
    function count5(){
      var result=new Array();
      for(var i=0;i<5;i++){
        result[i]=function(){
          return i;
        }
      }
      return result;  //每个result[i]()都返回5
    }
```
  解释:
  1. 每个result[i]函数的作用域链都保存这count5的活动对象,并没有因为函数的执行完毕而销毁,引用的都是同一个变量i。
  所以每一个函数内部的i都是5.
  2. 解决方法:用一个立即执行匿名函数,由于函数传参数按值传递的,所以每个匿名函数内部又定义了闭包，可以访问到num.这样一来,立即执行函数执行完毕销毁后,result数组的每个函数都还保存这num变量的一个副本,因此 可以返回不同的值

  ```javascript
  function count5(){
    var result=new Array();
    for(var i=0;i<5;i++){
      result[i]=(function(num){
        return function(){
            return num;
        }    
      })(i);
    }
    return result;  //result[i]()为 i
  }
  ```

  3. 函数执行完毕后，count5执行环境的作用域链会被销毁，但是他的活动对象由于匿名函数还指向它，所以还存在于内存之中，直到匿名函数的作用域链被销毁
  ![匿名函数作用域图]({{ site.urlimg }}/post/closure-scope-1.png)

- 利用闭包实现数据隐藏和封装。
- 利用立即执行匿名函数定义私有变量和函数
```javascript


```


## 关于this对象



![]({{ site.urlimg }}post/closure-1.png)
![]({{ site.urlimg }}post/closure-2.png)
![]({{ site.urlimg }}post/closure-3.png)


## 内存泄露
