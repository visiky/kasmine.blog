---
layout: post
title: 在命令行播放音乐
date: 2018/01/02
category: 工具类
excerpt_separator: "excerpt_end"
---

🎵  无须打开音乐播放器,直接在命令行中播放音乐

🔩  此篇科普两种工具,希望对像我一样的程序小白有所帮助

excerpt_end

## SOX 
- 缺点: 无法播放url链接的音频

```js
brew install sox

// play [filename]
play 天后.mp3

// 查看更多关于sox的用法
man sox
```

## MPlayer
官方网站：http://www.mplayerhq.hu/design7/dload.html

Mplayer的特点是支持的格式相当多，还有要播放高清视频肯定要用到这个。

Mplayer 是一款自由的多媒体文件播放器。
据其手册中所述，Mplayer 是目前这个星球上支持多媒体文件格式最多的软件。

```js
brew install mplayer

// mplayer [filename]
mplayer 天后.mp3
```
也可以实现一个脚本来播放

注意: 需要安装`node`
```
const exec = require('child_process').exec;
const urls = [
  "http://m10.music.126.net/20180102101915/5fcfcc09621d6ac432e02f912827bd1e/ymusic/63d8/b566/34c9/59b67690633d8f7c53f91528561e6c2d.mp3",
  "http://m10.music.126.net/20180102101942/c7e32090c96cf1ed3129ffd8d5ecf9d2/ymusic/a828/4657/0d1b/45969fad12e4503f9bfae81d6a3db8bb.mp3"  
];

function play(i) {
  exec("mplayer "+urls[i], {maxBuffer: 20 * 1024 * 1024}, (error, stdout, stderr) => {
    console.log(error)
    play((i++) % urls.length)
  });
}

function start() {
    try {
      play(0) 
    } catch(e) {
      console.log(e);
    }
}
```