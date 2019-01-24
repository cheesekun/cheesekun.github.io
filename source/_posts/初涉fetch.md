---
title: ajax接班人 => fetch
permalink: cheesekun.top/ch1034
date: 2017-9-22 10:10:10
categories:
- 前端
tags:
- 前端
- fetch
---

## 前言
emmmm，由于学习`node`异步的时候研究了一波`promise`
因此对于使用`promise`的`fetch`产生了极大的兴趣
（忘了原生ajax的写法orz）
小小总结一下`fetch`的用法
基本api翻翻 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 就ok了

## 支持程度
> time: 2017/9/22 0:07:52 

![](http://oksbjk6b9.bkt.clouddn.com/fetch-support.png)

## 基本用法
### GET
```javascript
fetch('/api/user/1').then((res) => {
  if (res.ok) {
   	return res.json()  // promise对象
  } else {
    console.log('error1')
  }
})
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log('error2' + err)
  })

```
### POST
```javascript
fetch('/api/user', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json;charset=UTF-8'
  },
  credentials: 'include',  // 用来让fetch携带cookie
  body: JSON.stringify({
    account: 'cheesekun',
    passwd: 'cheesekun'
  })
})
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log(data)
  })
```

## 封装fetch
加工了一波别人的封装
```javascript
class AjaxFetch {
  constructor(opts, params) {
    const isUrl = typeof opts === 'string';
    this.defaults = {
      method: 'GET',
      headers: {},
      data: {},
      credentials: 'include', //默认不带cookie，指定inlude，始终携带cookie
      cache: 'default',
      // mode:''//请求时会自动识别是否跨域，不需要手动设置
    };
    this.options = Object.assign(this.defaults, (isUrl ? params : opts) || {});
    this.methods = ['GET', 'PUT', 'PATCH', 'DELETE', 'POST'];
    this.url = isUrl ? opts : this.options.url;
    this.init();
    return isUrl ? this : this[this.options.method.toLowerCase()](this.options.data)
  }
  init() {
    this.methods.forEach(method => {
      this[method.toLowerCase()] = data => {
        if ('GET' == method) {
          this.url += (this.url.includes('?') ? '&' : '?' + this.transformData(data))
        } else {
          // if (data instanceof FormData) {
          //   this.options.headers['Content-Type'] = 'multipart/form-data';
          // } else 
          if (typeof JSON.parse(data === 'object')) {
            this.options.headers['Content-Type'] = 'application/json;charset=UTF-8';
            // 服务端消息主体是序列化后的 JSON 字符串
          } else {
            this.options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
          }
          // this.options.body = this.transformData(data);
          this.options.body = data;
        }
        delete this.options.data;
        this.options.method = method;
        console.log(this.options)
        return fetch(this.url, this.options);
      }
    })
  }
  transformData(obj) {
    // 这里还需要做更多的处理
    if (obj instanceof FormData) return obj;
    var params = [];
    for (var i in obj) {
      params.push(`${i}=${obj[i]}`);
    }
    return params.join('&');
  }
}

function http(opt, pms) {
  if (!opt) return;
  return new AjaxFetch(opt, pms);
}

```
## 调用
```javascript
// 原生
fetch('/api/photo', {
  method: 'POST',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: "name=二次元"
}).then((res) => {
  return res.json()
})
  .then((data) => {
    console.log(data)
  })
})

// 使用封装
http({
  url: '/api/photo'
  method: 'POST',
  body: "name=二次元"
})
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log(data)
  })

```


## 使用async控制
`fetch()`返回的是一个 `Response流`，读取完成。它返回一个 promise
`res.json()`返回一个被解析为JSON格式的promise对象
```javascript
btn_ajax_http.addEventListener('click', async () => {
  let res = await http({
    url: 'api/photo',
    method: 'POST',
    data: JSON.stringify({
      name: '二次元'
    })
  })
  let data = await res.json()
  console.log(data)
})
```

## fetch下载文件
```javascript
let btn_photo = document.getElementById('btn-photo')
btn_photo.addEventListener('click', () => {
  fetch('./static/bili.jpg').then((res) => {
    return res.blob()
  })
    .then((data) => {
      let download = document.getElementById('download-link')
      let objURL = URL.createObjectURL(data)
      console.log(data)
      download.setAttribute('download', data.type)
      download.setAttribute('href', objURL)
      download.innerText = '来下载看看'
    })
})
```
## fetch坑点
> fetch 在发送请求时默认不会带上 Cookie

所以请求参数要加上`credentials: 'include'`
```javascript
{
  headers: {},
  credentials: 'include'  // 用来让fetch携带cookie, 不是写在请求头
}
```

> fetch 只有在遇到网络错误的时候才会 reject 这个 promise，比如用户断网或请求地址的域名无法解析等。只要服务器能够返回 HTTP 响应（甚至只是 CORS preflight 的 OPTIONS 响应），promise 一定是 resolved 的状态。

所以要使用`res.ok`来判断是否 200

> res方法（如`res.json()`）重复调用会报错
> Uncaught TypeError: Already read


## 结语
比起`ajax`, 使用上`async`的`fetch`显得十分简洁
浏览器的支持率也越来越高
基本上现在投身`fetch`是没问题啦😁