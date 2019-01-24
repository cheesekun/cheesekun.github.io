---
title: Mongoose
permalink: cheesekun.top/ch1025
date: 2017-4-23 10:10:10
categories:
- 数据库
tags:
- 数据库
- MongDB
- Mongoose
---

## 前言
学数据库肯定需要知道怎么连接后台
`Mongoose` 是用来方便连接 `MongoDB` 与 `node` 的一个工具包
是时候学习一波
## nodejs连接MongoDB
连接数据库前需要先打开数据库 MongoDB
```git
yarn add mongoose  // 安装 mongoose 依赖
```
```javascript
let mongoose = require("mongoose");
let db = mongoose.connect("mongodb://127.0.0.1:27107/test");
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});
```
## 操纵数据
1. Schema：数据库集合的模型骨架，或者是数据属性模型传统意义的表结构。
2. Model ：通过Schema构造而成，除了具有Schema定义的数据库骨架以外，还可以具体的操作数据库。
3. Entity：通过Model创建的实体，它也可以操作数据库。
 > 但Model比Entity更具操作性。

```javascript
let mongoose = require("mongoose");
let db = mongoose.connect("mongodb://127.0.0.1:27017/test");
let TestSchema = new mongoose.Schema({  // 使用 Schema 创建集合结构(表结构)
    name : { type:String },
    age  : { type:Number, default:0 },
    email: { type:String },
    time : { type:Date, default:Date.now }
});
let TestModel = db.model("test1", TestSchema );  // test1 集合使用 Schema 结构，若不存在 test1 集合，则创建
let TestEntity = new TestModel({  // 使用 TestModel 新建一个数据
    name : "helloworld",
    age  : 28,
    email: "helloworld@qq.com"
});
TestEntity.save(function(error,doc){  // 保存数据于 test1 
  if(error){
     console.log("error :" + error);
  }else{
     console.log(doc);
  }
});

```
## Model增删查改
```javascript
let TestSchema = new mongoose.Schema({
    name : { type:String },
    age  : { type:Number, default:0 },
    email: { type:String },
    time : { type:Date, default:Date.now }
});
let TestModel = db.model("test1", TestSchema);  
// let TestModel = db.model("test1", new mongoose.Schema());
// 集合结构为空的话，不能插入数据  
```
### 增
- Model方法 create
 ```javacript
TestModel.create({ name:"model_create", age:26}, function(error,doc){
    if(error) {
        console.log(error);
    } else {
        console.log(doc);
    }
});
 ```
- entity方法 save
 ```javascript
let Entity = new TestModel({name:"entity_save",age: 27});
Entity.save(function(error,doc) {
    if(error) {
        console.log(error);
    } else {
        console.log(doc);
    }
});
 ```

### 删
Model.remove(查询条件,callback);
```javascript
let conditions = {name: 'helloworld'};
TestModel.remove(conditions, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Delete success!');
    }
});
```
### 改
Model.update(查询条件,更新对象,callback)
```javascript
var conditions = {name : 'test_update'};
var update = {$set : { age : 16 }};  // $set 表示只修改 age，否则全覆盖
TestModel.update(conditions, update, function(error){
    if(error) {
        console.log(error);
    } else {
        console.log('Update success!');
    }
});
```
### 查
Model.find({}, function(error, docs));
若第一个参数为空对象，则 `docs` 为所有数据
```javascript
TestModel.find({ "age": 28 }, function (error, docs) {
  if(error){
    console.log("error :" + error);
  }else{
    console.log(docs); //docs: age为28的所有文档
  }
}); 
```
### 深海巨坑
使用 `mongoose` 时，发现`mongoose`会自动帮你把 `model`中的集合名改为复数，
也就是说。如果你设置
```javascript
let model = mongoose.model(table, schema);
// 你在数据库中想创建的 table 集合会变成 table
// 如果你的数据库中的集合名不是复数 s ，那么基本操作不了
// 也就是说，你最好把你要使用`mongoose`操作的集合名设置为复数 s
```
## 结语
学习源： [Mongoose](http://www.hubwiz.com/course/543b2e7788dba02718b5a4bd/)
真是通俗易懂的操作呀
MongoDB 好感度 up up up
😂

