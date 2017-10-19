---
layout: post
title: 2017-09-18-urumps
tags:
published: false
---

redux-saga 为此提供了另外一个函数`put`，这个函数用于创建 dispatch Effect

```markup
import { put } from 'redux-saga/effects';

function *fetchProducts {
    const ret = yield call(Api, {});
    yield put({ type: 'xxx', ret });
}
```

