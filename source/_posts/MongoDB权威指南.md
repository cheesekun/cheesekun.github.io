---
title: 「MongoDB权威指南」01
permalink: ch1026
date: 2017-4-28 10:10:10
categories:
- 数据库
tags:
- 数据库
- MongDB
- MongoDB权威指南
---

## 前言
由于`MongoDB` 这个数据库使用起来太舒服了
两种查询语句，反正我是莫名喜欢第二种
```sql
// Mysql
SELECT *
FROM table

// MongoDB
db.table.find()
```
所以去屠猪馆找了一本「MongoDB权威指南」
![](http://oksbjk6b9.bkt.clouddn.com/MongoDB%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97.jpg)
所以，记笔记记笔记📑
## 第一部分-MongoDB简介
### 动态模式
集合是动态模式的，意味着他可以任意插入不同类型的键值对
这就引出了一个问题，有必要创建多个集合存放不同类型数据么
答案是肯定的，从 糅杂，和速度上看，分开时必须额度

这也就是为什么用 `mongoose` 时，需要先定义 `schema` 表结构模式，再规定哪张表使用 该`schema` 模式的 模型 `model`
虽然`MongoDB` 没有强制要求
### 子集合
db.blog  // blog 集合下 有两个子集合 posts 和 authors。
db.blog.posts
db.blog.authors
虽然子集合没有特别之处，但是可以使结构更加清晰
### json扩展
一般的json 只有6种数据类型
`null`,`Boolean`,`Number`,`String`,`Array`,`Object`
而`MongoDB`扩展了一些：
`Date`,`RegExp`,`ObjectId`,`内嵌文档`,`任意javascript代码`,`二进制数据`
```javascript
var data = {
	time: new Date(),
	reg: /foobar/i,
	aId: ObjectId(),
	address: {
		city: "广州",
		university: "xxxx"
	},
	func: function() { console.log("I AM A FUNCTION"); }
}
```
### shell
#### 自定义shell
可以创建 `mongorc.js` 在里面定制自己想要的提示

每次执行完 `shell` 后，显示该操作的完成时间
```javascript
prompt = function() {
	return (new Date())  + "> ";
}
```
每次执行完 `shell` 后，显示当前使用的数据库
```javascript
prompt = function() {
	if(typeof db === 'undefined') {
		return '(nodb)>';	
	}
	try {
		db.runCommand({getLatError: 1});  // 捕获数据库错误
	}catch(e) {
		print(e);
	}
	return db + "> ";
}
```
#### print
shell 打印使用 `print`
```javascript
arr = [ , ]
for(var i in arr) {
	print(db.xx[arr[i]])
}
```
### 增删查改
```javascript
db.foo.Insert([{},{},{}])  // 批量插入，参数为一个多文档数组
```
#### 重大问题
db.foo.find()  // 返回的是一个数组对象，所以如果要对里面的对象进行修改，要用[]获取
```javascript
var bb = db.foo.find({_id: ObjectId{}})[0];  // 或者直接使用findOne
bb.name = "job";  // 给 bb对象添加一个 name
db.foo.update({_id: ObjectId()}, bb)  // 更新数据库对象，
```
键值对的命名不可以使用 `.`和`$`,会影响到obj.obj和修改器的使用，冲突
### update修改器
**一个键只能有一个修改器**
```javascript
db.foo.update({name:"cheesekun"},{$inc:{num:1}})
// 每次更新，num+1
```
> $inc  // 给Number类型增加相应数值
$set  //修改键
$unset  // 删除键
$push  // 添加数组元素,

```javascript
db.blog.posts.update({title:"cheesekun"}, 
	{$push: {comments:{name:"cheesekun", age:18}}}
)
db....findOne()
> {
> 	comments: [
> 			"name": ...
> 			...
> 		]
> }
```
$addToSet  // 添加数组元素，避免重复插值
```javascript
db.blog.posts.update({title:"cheesekun"}, 
	{$addToSet: {comments:{name:"cheesekun"}}}
)
// 若comments 数组中已存在"cheesekun"，则不插值
```
$pop  // 删除数组元素，{$pop:{keys:1}}从数组尾部删除，-1从头部删除
$pull  // 删除匹配的数组元素
```javascript
{
	name: "cheesekun",
	arr: [1,1,2,3,1]
}
{$pull: {arr:1}}
```
update(参数1，参数2，true，true)
// 参数3表示若集合没有该字段，则用参数2生成该字段
// 参数4表示修改所有匹配字段
### find
```javascript
db.foo.find({}, {name: 0})  // 0 表示剔除查询条件中含有name的字段，1 含有
```
### 查询条件
**一个键能有多个条件**
>$lt    <
$lte   <=
$gt    >
$gte   >= 
$ne    ≠

```javascript
db.foo.find({age: {$gt: 15, $lte: 18}})  // 查询 15<age<=18 的所有字段
```
> $in    单建非查询
$nin   逆单键非查询
$or    多建非查询

```javascript
db.foo.find({arr: {$in: [1,9,4]}})  // 查询含有 1||9||4 的所有字段
db.foo.find({$or: [{name: "cheesekun"}, {sex: "man"}]})  // 查询 name==="cheesekun"||sex==="whs" 的字段
```
$and   多键且查询
```javascript
db.foo.find({$and: [{x: {$lt:1}}, {x:4}]})   // 查询 x<1&&x=4，会出现 {x:[0,4]}的字段
```
$slice
返回某个键匹配的数组元素的一个子集
```javascript
{ .. , conments: [1,2,3 ... 20]}
db.foo.find({}, {comments: {$slice: -10}})  // 返回最后10条数据
```
$elemMatch
对数组对象进行操作，不需要写出所有匹配内容
```javascript
db.foo.find({comment: {$elemMatch: {x:1, y:2}}})
// 匹配 foo 中 comment 数组对象中，{x:1,y:2}的所有字段
```
#### 特定类型查询
$exists    判断键的存在
```javascript
db.foo.find({y: null})  // 不仅会查出y为null 的字段，也会检索出不包含y键的字段
db.foo.find({y: {$in:[null], $exists: true}})   // 只查出y为null 的字段，其实只使用 $in 也能达到效果
```
可以实现`mysql`
````sql
select name from table

db.table.find({name: {$exists: true}})
```
#### 使用正则
```javascript
db.foo.find(name: /cheese/i)  // 将name为cheese所有大小写的字段都检索出来
```
#### 常用方法
limit(3)  // 只返回3个匹配
skip(3)   // 略过前3个匹配
sort({"num": -1})      // 以num降序排序呈现匹配字段
```javascript
db.foo.find({x: {$gt: 10}}).skip(3).limit(4).sort({x: 1})
// 检索 x>10 的字段，略去前3个，返回前4个，再升序
```
## 结语
这笔记打的大概只有自己能看了😵
这是第一部分的基础内容
第二部分的 索引 可以来慢慢啃了














