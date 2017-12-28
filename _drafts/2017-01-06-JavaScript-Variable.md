---
layout: post
tags: javascript
# category: javascript
title: JavaScript 变量和作用域
---

## 理解基本类型和引用类型
- 基本类型：简单的数据段
- 引用类型：可能由多个值组成的对象.要动态的添加/删除属性,只能给引用类型操作。

  ```javascript
  var name="kasmine";
  name.age=20;         // 尝试给基本类型添加属性
  alert(name.age);    //  undifined
  ```

注意点：
** javascript中的浅拷贝和深度拷贝 **

  当一个变量向另一个变量复制引用类型的时候，其实是浅复制

  看下面的例子
  ```javascript
  var obj1=new Object();
  var obj2=obj1;
  obj1.name="kasmine";
  alert(obj2.name);   //kasmine
  ```
![变量复制 对象&内存关系图]({{ site.urlimg }}post/javascript-variable.png)

 ECMAScript中的Object.create()其实也是浅复制
 ```javascript
var person={
  name:"kasmine",
  friends:["小白","小黑","小黄"]
}
var anotherPerson=Object.create(person);
anotherPerson.name="Momo";
// var anotherPerson=Object.create(person,{
//    name:{
//      vale:"Momo";
//    }
// });
anotherPerson.friends.push("小红");
alert([person.friends,anotherPerson.name]);
// 小白，小黑，小黄，小红，Momo
 ```
因为是浅复制，所以person.friends和anotherPerson.friends指向当而是同一个对象;

  **引申**：在进行原型链继承的时候，建议 把公有属性作为原型对象的属性,而引用类型的属性值作为子类自己的属性，防止发生子类进行的修改，影响了父类原型对象的属性。

    <small>参看 [JavaScript继承](TODO:)一章</small>
---

**ECMAScript中所有函数的参数都是按值传递的**

  看一个例子：

  ```javascript
  function setName(obj){
    obj.name="kasmine";
  }
  var person=new Object();
  setName(person);
  alert(person.name);   // "kasmine"

  ```
  虽然在局部作用域内的修改的对象，会在全局作用域中反映,但这是因为变量是按值传递的，而访问是按引用访问同一个对象，因为在传递引用类型的值的时候，会把perso这个值在内存的地址复制给一个局部变量(上面我们讲过,obj和person会指向堆内存的同一个变量),因此对局部变量的修改会反映在函数外部。

  可以想象ECMAScript中函数的参数为局部变量,局部变量在函数执行完毕会被销毁


## 理解执行环境
待补充
- 执行环境
- 作用域链
- 活动对象
