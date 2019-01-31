---
title: JSONP跨域访问
permalink: ch1014
date: 2017-3-19 10:10:10
categories:
- 前端
tags:
- javascript
- ajax
- 跨域 
- 前端
---

## 前言
昨天在写一个只使用原生js的一个todolist小玩意，然后想给它添加个当地天气的小功能，
没想到引发我的一堆基础不牢靠

## ajax
首先，我是想使用ajax的GET方法获取天气api的数据（以前使用jq获取过），可是怎么也获取不了，
并且`request.status === 0`,此时的我很懵逼，一直看过404，200，304，500啥的，就没看过0.
后来google一下，发现是跨域问题。以前也听说过跨域，但一直没去深究，并且以前使用ajax也是调用本地数据，
所以一直都不怎么了解。先来看看什么是跨域。。
- 概念
 > 只要协议、域名、端口有任何一个不同，都被当作是不同的域。
 > 对于端口和协议的不同，只能通过后台来解决。
- 具体来说

URL                         |说明                        |是否允许通信                           
:---------------------------|:--------------------------:|---------------------------------------:
http://www.a.com/a.js       |                            |   
http://www.a.com/b.js       |同一域名下                   |允许                      
http://www.a.com/lab/a.js   |                            |   
http://www.a.com/script/b.js|同一域名下不同文件夹           |允许                    
http://www.a.com:8000/a.js  |                            |        
http://www.a.com/b.js       | 同一域名，不同端口           |不允许 
http://www.a.com/a.js       |                            |         
https://www.a.com/b.js      |同一域名，不同协议             | 不允许                        
http://www.a.com/a.js       |                            |   
http://70.32.92.74/b.js     |域名和域名对应ip              |不允许  
http://www.a.com/a.js       |                            |     
http://script.a.com/b.js    |主域相同，子域不同            | 不允许    
http://www.a.com/a.js       |                            | 
http://a.com/b.js           |同一域名，不同二级域名（同上)   | 不允许（cookie这种情况下也不允许访问）
http://www.cnblogs.com/a.js |                            |         
http://www.a.com/b.js       |不同域名                     | 不允许  

所以说，一旦跨域了，就无法使用ajax来请求其他网站提供的数据(如天气api，快递api)。
因为以前使用了jq的`getJSON`，因为它已经封装好，所以没有意识到跨域问题
具体怎么使用jq跨域，看我以前写的一个[天气预报](http://cheesekun.top/fcc/weather/)小demo

## 为何浏览器不支持跨域访问
因为浏览器实现的同源策略的限制，XmlHttpRequest只允许请求当前源（域名、协议、端口）的资源，所以AJAX是不允许跨域的
举个例子，如果我在我的页面上使用`<iframe>`标签嵌一个银行页面，而你在我当前页面登陆那个嵌套的银行页面，在没有同源策略限制下，
我就可以通过js读取到你输入的银行密码和登录名，这样你就gg了。

## JSONP
虽然ajax不支持跨域访问，但是像`<script>`,`<link>`,`<img>`,`<iframe>`这些标签是允许跨域的，
你应该有使用过`<link>`调用过外部的css，或者`<script>`调用过外部的js文件。
所以JSONP就利用了这点来实现跨域访问
但是我不想使用jq，毕竟jq能解决的js爸爸也肯定能解决，所以我就来了解原生的jsonp

- jsonp介绍
 > 全称 JSON with Padding，用于解决AJAX跨域问题的一种方案
- jsonp原理
 > 利用`<script>`标签获取到api数据，再把数据传给回调函数进行操作
 
```javascript
 <script type="text/javascript">
    function dosomething(jsondata){
        //处理获得的json数据
    }
 </script>
 <script src="http://a.com/data.php?callback=dosomething"></script>
 ```
- JSONP小贴士
 > js文件载入成功后会执行我们在url参数中指定的函数，并且会把我们需要的json数据作为参数传入。
 > 所以JSONP是需要服务器端的页面进行相应的配合的。
 > 例如`<script src="http://a.com/data.php?callback=dosomething&name=芝士君&sex=man></script>`
 > 我们传入的`name`和`sex`,服务器接收到该数值，要做出相应的反应，回馈相应数据
- JSONP优缺点
 > 优: 兼容性非常好，其原理决定了即便在非常古老的浏览器上也能够很好的被实现。
 > 缺: 只能 GET 不能 POST，存在xss脚本注入的安全隐患

## 结语
实现JSONP的人真机智，感觉就像那些钻法律空子的人。hhh贬义的比喻褒义地夸
