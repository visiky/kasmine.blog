---
layout: post
title: 使用 npm script 构建前端项目
tags: 前端自动化
---


为了前端团队更好的协作开发同时提高项目编码质量，往往需要将Web前端使用工程化方式构建,

比较热门的有`gulp`,`grunt`,`webpack`等等,我们配置的时候可以知道大都是依赖于npm,这就必不离开`package.json`的配置,运行如下命令行即可初始化一份`package.json`
```
npm init
```

不过,我主要想说的是 `npm scripts`

# npm scripts

先看一份初始化的 `package.json`
```json
{
  "name": "kasmine.typescript",
  "version": "1.0.0",
  "description": "",
  "main": "./dist/main.js",
  "dependencies": {
    "gulp": "^3.9.1",
    "gulp-typescript": "^3.1.6",
    "typescript": "^2.2.2"
  },
  "devDependencies": {
    "babel-preset-es2015": "^6.24.0",
    "babelify": "^7.3.0",
    "browser-sync": "^2.18.8",
    "browserify": "^14.3.0",
    "gulp-sourcemaps": "^2.5.1",
    "gulp-uglify": "^2.1.2",
    "tsify": "^3.0.1",
    "vinyl-buffer": "^1.0.0",
    "vinyl-source-stream": "^1.1.0"
  },
  "scripts": {
    "start": "gulp && node ./dist/main.js"
  },
  "author": "",
  "license": "MIT"
}
```

但我们命令行输入 `npm [run] start` 即可自动运行`gulp`,然后运行`node ./dist/main.js`,是不是每次运行都可以减少我们很多输入呢,很方便是吧 n(*≧▽≦*)n

# 实际开发配置

不仅仅如此,我们还可以配置多个命令,看看实际开发时配置的 scripts是怎么样的
```
"scripts": {
    "lint": "eslint src",
    "clean": "rimraf lib",
    "build": "npm run clean && babel src --out-dir lib",
    "start": "node server.js"
  },
```
嘿嘿,开发过程我们使用`npm run start`,发布过程使用`npm run build`会自动先执行 `npm run clean`清除旧版本,再构建新版本~

# 使用npm clean

在这里，需要说明的是：因为windows下不支持`rm rf 文件夹路径`，所以需要使用第三方依赖包`rimraf`,
```
npm install rimraf --save-dev
```

参考链接:

  1. [浅谈前端自动化构建](http://www.cnblogs.com/kasmine/p/6436131.html)
  1. [grunt & gulp](https://zhuanlan.zhihu.com/p/20309820)
  1. [UED团队前端自动化构建环境的搭建](http://markyun.github.io/2015/The-front-end-code-build-automated-build-environment/)