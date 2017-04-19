---
layout: post
author: kasmine
tags: sublime
---

**前言**
学习前端大概也有一年了,这一年里使用的开发工具一直都是Sublime,虽然他没有WebStorm那种自动化能力很强的功能，但是由于他的界面好看以及丰富的插件功能,让我一直以来都没有离开他~~

## 主题推荐

个人比较看重开发环境，所以比较喜欢在主题方面寻找最适合自己，最让自己赏心悦目的一款，以下是我使用的一些体会和推荐~


### Subliem Text

| 主题| 介绍|
| ------------- |:-------------:|
| preap | 很漂亮的sublime text3主题,Predawn for sublime 和 Atom的轻微改动版本 |
| Monokai | 比较老牌的主题，使用过sublime的人估计都知道 |
| One dark | 预览地址：[One Dark 主题](https://packagecontrol.io/packages/Theme%20-%20One%20Dark)
我用的是下面这一款，preap（主要是喜欢他自带的图标）
####  安装（可以使用 Package Control）
- **方法一：**
 Press <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> on OS X or<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> on Windows/Linux
输入 `Install Package`或者简写`IP`
搜索` preap`
- **方法二 :**
比较奇怪的是，我自己搜索不到这个插件，于是附上另外一种安装方法：
  - 自己下载Preap的压缩包，下载完成后，解压，重命名为 Preap”，然后复制到 Packages的目录下 ( Sublime Text > Preferences > Browse packages... )
  - 下载地址：[原先可下载的地址 不可用了，有需要的私聊我，我有空再把自己的放上github]
  - `preferences`->`settings` 打开你的用户设置文件 ：preferences.sublime-settings 激活主题:

 ``` json
 {
       "theme": "preap.sublime-theme",
       "color_scheme": "Packages/Preap/Schemes/preap.tmTheme",
 }
   ```

还可以根据自己的喜好，在`preferences`->`settings` 下自定义：
下面是我的配置，可以参考一下

  ```
  {
	"always_show_minimap_viewport": true,  //显示小地图
	"caret_extra_width": 1,
	"caret_style": "phase",
	"close_windows_when_empty": false,
	"color_scheme": "Packages/User/Color Highlighter/themes/Monokai (SL) (SublimePythonIDE).tmTheme",
	"copy_with_empty_selection": false,
	"default_encoding": "UTF-8",   //默认编码 utf-8
	"drag_text": true,             //可拖拽文字
	"draw_minimap_border": true,  //小地图的边界
	"enable_tab_scrolling": false,
	"findreplace_small": true,
	"font_face": "Consolas",
	"font_options":
	[
		"no_round"
	],
	"font_size": 12,
	"highlight_line": true,
	"highlight_modified_tabs": true,
	"ignored_packages":
	[
		"Vintage"
	],
	"match_brackets_content": false,
	"match_selection": false,
	"open_files_in_new_window": false,
	"overlay_scroll_bars": "enabled",
	"preview_on_click": true,
	"save_on_focus_lost": true,
	"scroll_past_end": true,
	"scroll_speed": 5.0,
	"show_full_path": false,
	"sidebar_large": true,         //侧边栏的大小选择
	//"sidebar_small":true,
	"tabs_small": true,           //tabs的大小也是可选择的
	"theme": "preap.sublime-theme",
	// "theme": "Seti.sublime-theme", //seti这一款主题也不错
	"translate_tabs_to_spaces": true,
	"trim_trailing_white_space_on_save": true,
	"update_check": false,
	"word_wrap": true
}
```
其他的自定义，可以参考官方文档：[ Preap.theme 介绍](https://packagecontrol.io/packages/Preap)


##  插件推荐
 sublime拥有着丰富的插件和优美的可自定义界面,这是为什么Sublime一直很受热捧，并且我也一直使用的原因
 TODO:



## 快捷键
这里说一下自己觉得好用 常用的快捷键吧(其实纯属为给自己做个笔记，记牢~~）
###   sublime
<kbd>Ctrl</kbd>+<kbd>K</kbd>+<kbd>B</kbd>：关闭侧板栏，可让编辑界面大一些（同Atom）

<kbd>F11</kbd>：全屏（同Atom）：
