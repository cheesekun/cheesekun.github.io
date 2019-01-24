---
title: web存储---Storage
permalink: cheesekun.top/ch1010
date: 2017-3-13 10:10:10
categories:
- 前端
tags:
- 前端
- web存储
---
## 前言
> 作为 Web Storage API 的接口，Storage 提供了访问特定域名下的会话存储（session storage）或本地存储（local storage）的功能，例如，可以添加、修改或删除存储的数据项。
> 如果你想要操作一个域名的会话存储（session storage），可以使用 `Window.sessionStorage`；如果想要操作一个域名的本地存储（local storage），可以使用 `Window.localStorage`。
> — — &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FROM &nbsp;&nbsp;[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)

不同的浏览器是不共享Storage的
总之，这两个功能都是用来存储浏览器一些数据(如**一些HTML5的游戏数据或者是天猫京东购物车信息之类的**)，并且他们的属性和方法是一样的，除了存储时长和作用域不同:
> sessionStorage(一旦标签被关闭了，sessionStorage存储的数据也会被删除掉。不同标签页的同一个页面拥有各自的sessionStorage，数据不能共享。)
> localStorage(长期存在，除非手动清除，并且存储在浏览器中)
 >>(如果是隐私浏览模式的话，会重新创建数据库存储localStorage的数据，并且在关闭浏览器时，清除所有数据)
> 

所以只用localStorage举例就行了
其实localStorage相当于一个数据库，我们就以数据库的增删改查来看
并且
因为是HTNL5的新特性，所以先看浏览器支不支持先
```javascript
if(！window.localStorage){
	alert("该浏览器不支持localstorage");
	return false;
	} else{
		...
}
```
## 增
有3种方法
```javascript
var storage = window.localStorage;
storage["a"] = 1;
storage.b = 2;
storage.setItem("c", 3);
console.log(typeof storage["a"]);  //string
console.log(typeof storage["b"]);  //string
console.log(typeof storage["c"]);  //string
```
由于localStorage只能存储字符串，所以当你传入非字符串类型的值时，会被转化为string类型
## 查
同样3种方法
```javascript
storage.a;   //"1"
storage["b"];  //"2" 
storage.getItem("c");  //"3"  
```
> 其实增查的前两种方法和对象值的获取类似，不过官方推荐使用setItem()/getItem()

## 删
> 删除某个键

 ```javascript
 console.log(storage.getItem("a"));  //"1"
 storage.removeItem("a");
 console.log(storage.getItem("a"));  //null
 ```
> 删除localStorage的所有内容

 ```javascript
 console.log(localStorage);  //[object Storage] {b: "2", c: "3"}
 storage.clear();  
 console.log(storage.getItem("c"));  //null
 ```
## 改
> 直接对值进行修改即可

 ```javascript
 storage.b = 5;
 console.log(storage.b);
 storage.setItem("c",10);
 console.log(storage.c);
 ```

## 获取键名
 ```javascript
 storage.clear();  //先清除之前的所有数据
 storage.setItem("name","cheesekun");
 console.log(storage.key(0));  //"name"
 ```
## json格式存储
由于storage只能存储字符串，所以我们需要先存储json字符串，
使用时再把json字符串转化为json对象，再获取键值
- json小介绍
 - json对象
 > `var str1 = { "name": "cheesekun", "age": 19 }`;
 > 转化为json字符串: `var obj = JSON.stringify(str1);`
 - json字符串
 > `var str2 = '{ "name": "cheesekun", "age": 19 }'`;
 > 转化为json对象: `var obj = JSON.parse(str2);`

```javascript
var storage=window.localStorage;
var me = {
  name: 'cheesekun',
  age: 19
  };
var meStr = JSON.stringify(me);
storage.setItem("data", meStr); //将json字符串传入localStorage
var json=storage.getItem("data");  
var meObj=JSON.parse(json);  //将json字符串转换成为JSON对象输出
console.log(meObj);  //Object { age: 19, name: "cheesekun"}
console.log(meObj.name);  //"cheesekun"
 ```
## Web Storage 存储事件
当localStorage或者sessionStorage的数据发生变化的时候，浏览器都会在其他对该数据可见的窗口对象上触发storage事件（本窗口除外）。

重要：**只有当存储数据真正发生变化时才会触发存储事件，比如给一个item重新设置一个和原来一样的value，或者是删除一个不存在的item是不会触发存储事件的。**
- StorageEvent的几个属性：
 > key：item的key，没有则为null
 > newValue: item的新值，没有则为null
 > oldValue: item的旧值，没有则为null
 > storageArea: sessionStorage或者localStorage
 > url: 触发存储事件的脚本所在文档的url

```javascript
window.addEventListener('storage', function(e) {
	console.log(e.key, e.oldValue, e.newValue, e.storageArea, e.url);
}, false);
```
## localStorage小例子
> 输入内容，save
> 然后刷新页面
> surprise！！！ 它是不是还在(｡･ω･｡)ﾉ♡
> 关闭页面，再打开
> surprise！！！ sessionStorage是不是消失了(ﾉﾟ▽ﾟ)ﾉ

<ul id="previous"></ul><div><label for="session" style="margin-left:20px;">sessionStorage： </label><input type="text" name="session" value="" id="session"></div><div><label for="local" style="margin-left:20px;">localStorage： </label><input type="text" name="local" value="" id="local" style="margin-left:21px;"></div><input type="button" id="save" value="Save storage" style="margin-left:20px;"><input type="button" id="clear" value="Clear storage" style="margin-left:20px;">
<script>
  var addEvent = (function () {
      if (document.addEventListener) {
        return function (el, type, fn) {
          if (el && el.nodeName || el === window) {
            el.addEventListener(type, fn, false);
          } else if (el && el.length) {
            for (var i = 0; i < el.length; i++) {
              addEvent(el[i], type, fn);
            }
          }
        };
      } else {
        return function (el, type, fn) {
          if (el && el.nodeName || el === window) {
            el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
          } else if (el && el.length) {
            for (var i = 0; i < el.length; i++) {
              addEvent(el[i], type, fn);
            }
          }
        };
      }
    })();
    
    function getStorage(type) {
      var storage = window[type + 'Storage'],
        delta = 0,
        li = document.createElement('li');
      if (!window[type + 'Storage']) return;
    
      if (storage.getItem('value')) {
        delta = ((new Date()).getTime() - (new Date()).setTime(storage.getItem('timestamp'))) / 1000;   
        li.innerHTML = type + 'Storage: ' + storage.getItem('value') + ' (存活时长: ' + delta + 's ago)';
      } else {
        li.innerHTML = type + '： 我gg了';
      }
      document.querySelector('#previous').appendChild(li);
    }
    
    getStorage('session');
    getStorage('local');
    
    addEvent(document.querySelector('#save'), 'click', function() {
      var session = document.querySelector('#session');
      var local = document.querySelector('#local');
      sessionStorage.setItem('value', session.value);
      sessionStorage.setItem('timestamp', (new Date()).getTime());
      localStorage.setItem('value', local.value);
      localStorage.setItem('timestamp', (new Date()).getTime());
      getStorage('session');
    getStorage('local');
    });  
	  
    addEvent(document.querySelector('#clear'), 'click', function () {
      sessionStorage.clear();
      localStorage.clear();
      
      document.querySelector('#previous').innerHTML = '';
      getStorage('local');
      getStorage('session');
    });
</script>

---

## 结语
花了一整天研究这玩意，还有个`Cookie`没去了解，有机会再看吧

>　苦しい時でも、とにかく笑っている
>　再难熬的日子，也要笑对人生

参考文献: 
> [https://aximario.github.io/2016/12/15/web-storage/?utm_source=caibaojian.com](https://aximario.github.io/2016/12/15/web-storage/?utm_source=caibaojian.com)
> [http://www.cnblogs.com/st-leslie/p/5617130.html](http://www.cnblogs.com/st-leslie/p/5617130.html)
> [https://developer.mozilla.org/zh-CN/docs/Web/API/Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)