---
title: 终究到 hexo
permalink: cheesekun.top/ch1000
date: 2017-2-21
categories: 
- 博客
tags: 
- markdown
- hexo
- git
---

一开始在使用wordpress写博客还是hexo写博客上纠结了很久
然而拗不过wordpress是世界上使用人数最多的博客系统，所以就强行用了
然而对于有强迫症的我来说，wordpress的文字排版要我命
经常性得为一篇文章进行各种修改，orz受不了
后来接触了markdown，用它来写东西简直爽到飞起
完全不需要care排版，可以专心写东西
并且更巧的是，hexo的博文都是需要用markdown模式来写！！！
美滋滋。。
因此，放弃了使用几个月的wordpress，现在专心使用hexo。
并且，
现在不用交那万恶的服务器费用啦。
hhhhhhh.....(ﾉﾟ▽ﾟ)ﾉ

---
下面来写几条hexo比较常使用的git:
- 生成静态文件
 ```git
 $ hexo generate
 ```
- 运行hexo本地服务器
 ```git
 $ hexo server
 [http://localhost:4000/](http://localhost:4000/)
 ```
- 安装主题
 ```git
 cd/hexo/themes
 git clone https://主题下载链接
 cd ./主题目录、
 git pull
 ```
	> 然后修改/hexo/config.yml, 将其中的theme改为主题名称
	> 重新运行 $ hexo generate $ hexo server
- 上传hexo到github
 ```git
 hexo generate
 hexo deploy
 //简写合并如下
 hexo d -g
 ```
。
。
。
大概就这样，水完第一篇
。
(ﾉﾟ▽ﾟ)ﾉ