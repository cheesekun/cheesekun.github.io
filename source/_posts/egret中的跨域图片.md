---
title: egret 中的跨域图片

permalink: ch1037

date: 2019-01-20 10:10:10

categories:

- 前端

tags:

- 小游戏
- egret
- canvas
---

## <img>标签能显示的原因：

1. 跨域是浏览器的行为
2. `img src` 两张图片都可以显示的原因是`<img>`标签本身是允许跨域的

## canvas 跨域图片

1. 在`canvas`当中，图片是可以跟当前url不同域，但是引用不同域的图片会造成canvas被污染
2. 所以在选择渲染模式为`canvas`的情况下，这两张图片都可以在画布中显示
3. 如果该图片服务器的`access-control-allow-origin`没有将你的域加入名单的话，canvas对该图片的操作会被限制
4. [canvas跨域图片资源权限](https://blog.csdn.net/renfufei/article/details/51675148)
5. [启用了 CORS 的图片](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image)

```javascript
egret.ImageLoader.crossOrigin = 'anonymous'(匿名)
// 执行一个跨域的请求（比如，有 Origin: HTTP header）。但是没有发送证书（比如，没有 cookie，没有 X.509 证书，没有 HTTP 基本的授权认证）。如果服务器没有给源站证书（没有设置 Access-Control-Allow-Origin: HTTP头），图像会被污染而且它的使用会被限制。
```

## [webgl 跨域图片](https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-cors-permission.html)

1. `webgl`的限制比canvas更为严格

   canvas 直接可用跨域图片，只是会被限制一些图片读取操作

   但是webgl，使用跨域图片

   1. 需要设置`crossOrign`，也就是`egret.ImageLoader.crossOrigin = 'anonymous'(匿名)`

      > `crossOrign` 接受的值有三种。一种是 `undefined`，这也是默认值，表示“不需要请求许可”； 一种是 `"anonymous"` 表示请求许可但不发送任何其他信息；最后一个是 `"use-credentials"` 表示发送 cookies 和其他可能需要的信息，服务器通过这些信息决定是否授予许可。 如果 `crossOrign` 设置为其他任意值则相当于 `"anonymous"`。

   2. 图片的服务器必须将你的域加入到名单当中

      > access-control-allow-origin: *

2. 第二张fb的图片可以在webgl显示，是因为这张图片的服务器本身启用了`access-control-allow-origin: *`，允许了任何所有的其他域访问