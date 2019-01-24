---
title: 羞羞的node爬虫
permalink: cheesekun.top/ch1029
date: 2017-5-30 10:10:10
categories:
- 后台
tags:
- 爬虫
- 后台
- node
---
## 前言
学了一阵子`node`，除了用 `express` 写东西，就没怎么做过东西
突然就想写个 爬虫 来玩一玩，而且还是爬一些羞羞的东西

## 使用模块
[SuperAgent](https://cnodejs.org/topic/5378720ed6e2d16149fa16bd) 是个 http 方面的库，可以发起 get 或 post 请求。 
[cheerio](https://cnodejs.org/topic/5203a71844e76d216a727d2e) 大家可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样一样的
[fs](http://nodejs.cn/api/fs.html) 用于读写文件的一个依赖包
[superagent-logger](https://www.npmjs.com/package/superagent-logger) 用来打印http请求信息

## 流程
首先，我们要爬取得网址是 ： http://www.hacg.wiki/wp/anime.html
其次，我们要爬取得目标： 以以下格式保存在 `txt` 中
![](http://old5ohki5.bkt.clouddn.com/llssInfo.png)
再其次，分析我们要爬取的内容分布 ：  打开控制台
> title, id, tags 如下
> 爬取地址是： "http://www.hacg.wiki/wp/anime.html/page/" + i

![](http://old5ohki5.bkt.clouddn.com/llssarticle.png)

> time, seed 如下
> 爬取地址是： 'http://www.hacg.wiki/wp/' + id + '.html'

![](http://old5ohki5.bkt.clouddn.com/llssseed.png)

再再其次，我们可以从上面看出，要爬 time 和 seed 前提是把前边的 id 爬取到，
因此要先爬取 id ，再利用 id 拼凑 seed 所在的 url

最后， 可以来愉快地爬取了

## 知识点
还是有复习到一些知识
具体`superagent`,`cheerio`看上面我提供的 api模块文档链接

### 利用promise管理异步函数
当我第一次按正常同步思维用 `superagent` 先爬取 id 所在 url，
再调用下面使用 `superagent` 的函数获取 seed时，
我发现获取的 `seed` 一直是空的。
后来才意识到这是异步函数，不会按顺序进行。
因此我使用了 `ES6` 的 `promise` 控制先执行 爬取 id 
爬取完 id 再爬取 seed

### 用正则表达式获取seed
如果你有逛过该网站，你会发现他的 seed 是放得毫无规律的，
并不是存放在一个固定的 x标签 中，
因此我的做法是 把存放 seed 的整一个 `$('.entry-content')` 获取到，
再利用正则表达式整块文本进行匹配获取

## 坑点
神坑啊神坑，小问题费了我好长时间
### 磁力链接的大坑
一开始我以为 磁力链接 这玩意长度为 40 ，都是 大写字母 + 数字 的组合。
后来在爬取不到 seed ,让我一度怀疑人生的时候
巧合下，发现 磁力链接 有 小写字母，有 32长度 的，有 42长度 的。。
我一直以为是 重定向 问题， 哎，花了好几个钟在这上面纠结
不过也让我小小得重新了解了下 `http`

## 运行效果
![](http://old5ohki5.bkt.clouddn.com/llss.gif)
结果爬取行数有： 2700行、
爬取seed数： 450

## 代码地址
github: [llss-crawler](https://github.com/cheeseKun/llss-crawler)
具体注释都在代码里，有需要的小伙伴可以去 github 下下来，跑一下
感受有趣的爬虫

## 结语
第一次写爬虫，感觉很有趣，一个很自动化，一种互联网啥都 get 得到的感觉
😅（纯洁）
















