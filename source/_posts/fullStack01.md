---
title: 全栈初体验
permalink: cheesekun.top/ch1025
date: 2017-4-25 10:10:10
categories:
- 全栈
tags:
- nodejs
- MongoDB
- jade
- express
- mongoose
---


## 前言
据说现在不会点后台的前端都找不到工作了
吓得我这几天看起了`Nodejs`和`MongoDB`
并且做了一个应该算是最简单的前后端例子，如图
![](http://old5ohki5.bkt.clouddn.com/fullstack01.gif)
输入账户密码，提交表单，保存信息到数据库
再重定向到 showInfo 页面获取数据库中的信息，渲染在浏览器上
具体代码： [github](https://github.com/cheeseKun/fullStack/tree/master/infoSave)

## 主要技术
> 前端模板： jade
> 后台框架： express-generator
> 数据库连接： mongoose

默认电脑已安装`nodejs`,`yarn`或者`npm`,`MongoDB`

## 前期
```shell
yarn add express-generator  // 
express infoSave  // 创建生成 express 项目

cd infoSave 

yarn install  // 安装依赖包
yarn start  // 可以到 localhost:3000 看到运行界面

yarn add mongoose  // 安装 mongoose，不需要安装jade，express-generator自动安装了
```

## 中期
cd views
将 index.jade 文件内容修改为
```html
extends layout
block content
  h1= title
  p Welcome to #{title}
  form(method="post", action="/")
    babel(for="user") 用户名
      input(type="text",name="user",id="user")
    br
    babel(for="passwd") 密码
      input(type="password",name="passwd",id="passwd")
    br
    input(type="submit",value="提交")
```
touch showInfo.jade
```html
extends layout
block content
  h1= title
  p Welcome to #{title}
  ul
   each info, i in infos
     li
       span.user 账户： #{info.user}
       &nbsp&nbsp&nbsp&nbsp
       span.passwd 密码： #{info.passwd}
```
这两个jade是我们 / 和 /showInfo 两个路由所渲染的页面

cd index.js
修改为
```javascript
router.get('/', function(req, res, next) {
  res.render('index', { title: 'infoSave' });
});
```
添加
```javascript
router.get('/showInfo', function(req, res, next) {
  infos.find({}, function(err, docs){
    if(err) {
      res.render('showInfo', { title: 'showInfo' });
    }else {
      res.render('showInfo', {
      title: 'showInfo',
      infos: docs
    });
    }
  });
```
public文件夹中的stylesheets文件夹新建一个css文件form.css
```css
form {
  width: 300px;
  height: 300px;
}

babel {
  display: block;
  font-size: 20px;
}

input:not([type="submit"]) {
  box-sizing: border-box;
  padding: 5px;
  width: 200px;
  font-size: 15px;
  float: right;
}

input[type="submit"] {
  float: right;
  width: 100px;
  padding: 5px;
  background: #79f;
  cursor: pointer;
  font-size: 15px;
}
```

此时 `yarn start` 会发现 localhost:3000 可以加载
localhost:3000/showInfo 会报错，
因为我们还没有进行数据的交互

## 后期
在  infoSave 目录下，创建两个文件夹
schemas文件夹存放数据库集合的模型骨架
models文件夹存放Schema构造实例进行数据操作

文件夹schemas, 在里面创建文件 info.js,内容为
```js
let mongoose = require('mongoose');
let InfoSchema = new mongoose.Schema({
  user: String,
  passwd: String
})

// 导出InfoSchema模式
module.exports = InfoSchema;
```
文件夹models，创建文件 info.js，内容为
```js
let mongoose = require('mongoose');
let infoSchema = require('../schemas/info.js'); //引入'../schemas/info.js'导出的模式模块

// 编译生成info模型
let infos = mongoose.model('userInfo', infoSchema);

// 将info模型[构造函数]导出
module.exports = infos;
```
app.js文件添加
```javascript
// 连接MongoDB中的 infoDB 数据库，若没有则自动生成
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/infosDB');
```

到此，我们的工程结束了，
`yarn start`试试看，记得先开启MongoDB

## 结语
啊，有一种搬代码，没有写教程的感觉
hhh
第一次自己搭建运行前后端环境，真是愉悦呀
继续加油。。。
🙃

