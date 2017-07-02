---
layout: post
tag: css
title: 利用Less和Scss更好的使用BEM
---

BEM 即 Block（代表块，模块）Element（元素） Modifier（修饰符）

经典表示方式：`block__element--modifier`,`block-element__modifier`

更多了解可以看这篇文章 [https://en.bem.info/methodology/key-concepts](https://en.bem.info/methodology/key-concepts/)

举个例子示范：

|类型|前缀|例子|描述
|:---|:---|:---|---:|
|Component| c- | c-card |应用程序的主干，包含所有组件的修饰前缀|
|Layout module | l- | l-grid| 纯粹用于定位c-组件和布局|
|Helpers | h- | h-show| 具有单个功能，通常会使用！important 来提高特异性|
|States| is- | is-visible | 组件的状态|
|js-hooks| js- | js-tab| 拥有js行为的组件|

> 本文主要内容翻译自：[Doing BEM right with SCSS/LESS](https://codepen.io/vajkri/post/doing-bem-right-with-less)

## BEM 的滥用

 当使用CSS预编译器的时候，很容易发生BEM错误滥用

 举个例子，使用`&__element`来迭代它们的元素

```less
// Approach #1
 .very-long-component {
    display: block;

    &__child {
      background: red;
    }

    &__another-child {
      background: green;
    }

    &__third-child {
      background: blue;
    }
  }
```
编译后的结果：
```less 
 // Approach #2
 .very-long-component {
    display: block;
  }

  .very-long-component__child {
    background: red;
  }

  .very-long-component__another-child {
    background: green;
  }

  .very-long-component__third-child {
    background: blue;
  }
```

这种方式难免发生多次迭代`block-element`（就如：`.block__element__element`）

**更好的使用方式**

## In LESS

```less
@c: vary-long-component;

.@{c} {
  display: block;
}

.@{c}__child {
  background: red;
}

.@{c}__another-child {
  background: green;
}

.@{c}__third-child {
  background: blue;
}
```

## In SCSS

```css
$c: '.very-long-component';

#{$c}{
  display: block;
}

#{$c}__child {
  background: red;
}

#{$c}__another-child {
  background: green;
}

#{$c}__third-child {
  background: blue;
}
```

> 注意：scss（$）和less（@）的区别！！！差别还是很大的～～