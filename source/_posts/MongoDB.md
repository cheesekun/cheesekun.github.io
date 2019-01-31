---
title: MongDB 初体验
permalink: ch1024
date: 2017-4-21 10:10:10
categories:
- 数据库
tags:
- 数据库
- MongDB
---
## 前言
最近了解了下 `MongoDB`，发现是一个特别棒的 `nosql` 数据库
使用 `json` 数据存储，可以使用 js 语句
简直就是为前端走全栈使用的
![](http://oksbjk6b9.bkt.clouddn.com/mongodb-logo.png)

SQL术语/概念	| MongoDB术语/概念 |	解释/说明
:------------|:--------------:|------------:
database|	database	|数据库
table|	collection|	数据库表/集合
row|	document|	数据记录行/文档
column|	field|	数据字段/域
index|	index|	索引
table |joins	| 	表连接,MongoDB不支持
primary key|	primary key	|主键,MongoDB自动将_id字段设置为主键

## 数据库操作
```javascript
show dbs   // 查看当前系统有多少数据库
use [dbs name]  // 切换数据库，若没有当前数据库，db会在适当时候生成
db.dropDatabase()  // 删除当前数据库
```
## 集合操作
*集合(collections) 也就相当于 sql 中的 表(table)*
### 数据插入
> db.info.insert({json})	// 向 info 集合插入json数据
> db.info.insert([{},{}])  	// 向 info 集合插入多条json数据

```javascript
// 可使用js'语句
for(var i = 3; i < 20; i++) {
	db.info.insert({x: i});
}
```
### 数据删除
```javascript
db.info.remove({y: 999},false)  // 将所有 {y: 999} 的数据移除, true只删除第一个，默认false
db.info.drop()  // 删除info集合(表)
```
### 数据更新
```javascript
{x: 3, y: 3, z: 3}
db.info.update({x: 3}, {x: 666})  // 将 x:3 的字段用 x: 666 覆盖
db.info.find({x: 666})   // {x: 666, _id: ...}  完全覆盖

// 只修改 x， 而不覆盖y，z
db.info.update({x:3}, {$set:{x: 666}})  
db.info.find({x: 666})   // {x: 3, y: 3, z: 3, _id:...}

//更新不存在数据时插入数据
db.info.update({y: 100},{y: 999}， true)  // true表示若该数据不存在，则自动创建插入数据

//更新多条数据，默认只更新第一条
db.info.update({y: 100}, {$set:{y: 999}}, false, true)  // 第4个参数true表示将所有{y: 100} 的数据更新为{y: 999}
若不需要写4个参数，可指定参数，第三个参数为{upsert: boolean}, 第四个参数为{multi: boolean}
```
### 数据查询
> show collections  // 查看当前数据库的所有集合
> db.info.find()  // 查看当前集合的所有字段
> 条件集
 1. 大于($gt)
 2. 大于等于($gte)
 3. 小于($lt)
 4. 小于等于($lte)
 5. 不等于($ne)
 6. 包含于($in)
 7. 不包含于($nin)

```javascript
db.info.find(过滤条件)
db.info.find().count()  // 查看条数
db.info.find().skip(3).limit(2).sort({x: 1})  // 过滤前3条数据，只保存前两条，用x正序排序，倒叙-1
db.info.find( { 'tags.0' : 'fruit' } )  // 特定元素匹配，tags值数组的第一个元素

db.person.find({$and:[{age:{$gt:30}},{name:"Lucy"}]});  // age>30 且 name="Lucy"
db.person.find({$or:[{status:"A"},{age:30}]});  // age=30 且 status="A"
db.person.find({}, {name:1})  // 显示含有name的数据
```
## 索引操作
*索引通常能够极大的提高查询的效率*
*在系统中使用查询时，应该考虑建立相关的索引*
### 创建索引
**索引应该在数据库一开始创建好**
```javascript
db.info.getIndexes()  // 查看当前集合的索引
db.info.ensureIndex({x: 1})  // 创建索引，1为正向排序
db.info.ensureIndex({x: 1}, {name: "normal_index"})  // 将索引命名为 normal_index
db.info.ensureIndex({x: 1}, {unique: true})  // 设置唯一索引，集合不能插入相同索引值
db.info.dropIndex("normal_index")  // 删除 normal_index 索引
```
### 索引的种类
1. _id索引
 > MongoDB 默认为每一字段生成 _id
2. 单键索引
 > {x: 1}
3. 多键索引
 > {x: [1,2,3,4,5]}
4. 复合索引
 > {x:1, y:1}
5. 过期索引
 > 在一段时间之后会过期的索引，过期后相应数据会被删除
 > 适合存储一段时间之后会失效的用户的登录信息，存储的日志
 > 存在时间误差，最小删除时间为 30s
 
 ```javascript
db.info.ensuerIndex({time:1}, {expireAfterSeconds: 30})  // 30s 后删除 {time: 1}索引 
db.info.insert({time: new Date()})  // 必须是ISODate 或者 ISODate数组，否则不会自动删除，ISODate数组会以其中的最小时间进行删除
 ```
---
### 全文索引
只允许创建一个全文索引
db.info.ensureIndex({article: "text"})  // 与其他索引不同，全文索引的 value 不是排序的 1，-1， 而是一个固定的字符串
使用全文索引就可以避免去写那些繁琐的匹配函数了
```javascript
db.info.ensureIndex({article: "text"})
db.info.insert({article: "aa bb cc dd ee ff"})
db.info.insert({article: "aa cc dd ee ff"})
db.info.insert({article: "aa cc dd e"})
db.info.insert({article: "aa cc dd uu ii ww ee ff"})

db.info.find({$text: {$search: "aa"}})  // 检索字段中 article 键值含有"aa"的所有字段
db.info.find({$text: {$search: "aa bb cc"}})  // 检索字段中 article 键值含有 "aa" 或者 "bb" 或者 "cc"的所有字段
db.info.find({$text: {$search: "aa bb -cc"}})  // 检索字段中 article 键值含有 "aa" 或者 "bb" 并且不包含 "cc" 的所有字段
db.info.find({$text: {$search: "\"aa\" \"bb\" \"cc\""}})  // 检索字段中 article 键值含有 "aa", "bb" 和 "cc"的字段
```
#### 全文索引相似度
```javascript
使用 $meta 来获取索引的相似度数值
db.info.find({$text: {$search: "aa bb"}}, {score: {$meta: "textScore"}})  // 
检索"aa bb",计算出相似值
db.info.find({$text: {$search: "aa bb"}}, {score: {$meta: "textScore"}}).sort(score: {$meta: "textScore"})  // 
检索"aa bb",计算出相似值,并利用相似值进行排序
```
#### 全局索引限制
> 每次查询，只能指定一个 `$text` 查询，并且 `$text` 不能出现在 `$nor` 查询中
> 全文索引不支持中文

### 地理位置索引
略

## 结语
用起来很舒服的一个数据库
就决定是你了，MongoDB。
😀







