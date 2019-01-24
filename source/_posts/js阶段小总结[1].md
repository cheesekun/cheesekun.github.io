---
title: Js阶段性小笔记[1]
permalink: cheesekun.top/ch1020
date: 2017-3-30 10:10:10
categories:
- 前端
tags:
- javascript
- 前端
- 小总结系列
---

## 前言
每隔一段时间，就会了解到一些js之前没怎么注意，或者一些坑的知识点。
做个阶段性的笔记，以后翻到又会有一番意识。

## 基本类型，引用类型
### 基本类型
 > 保存在栈内存中的简单数据段，这种值完全保存在内存中的一个位置
 > `Undefined`、`Null`、`Boolean`、`Number`、`String`、`Symbol` (new in ES 6)

### 引用类型
 > 保存在堆内存中的对象，
 > JavaScript不允许直接访问堆内存空间中的位置和操作堆内存空间，只能通过操作对象在栈内存中的引用地址。所以引用类型的数据，在栈内存中保存的实际上是对象在堆内存中的引用地址。通过这个引用地址可以快速查找到保存在堆内存中的对象。

## 浅拷贝，深拷贝
*由于引用类型的值存储在堆内存中，值会被共用，所以出现了两种拷贝方式*
### 浅拷贝（shallow copy）
*拷贝原对象的引用*
  
 ```javascript
// 修改copy会改变原对象的值
let cheesekun = {
	name: "cheesekun", 
	age: 19,
}
let copyCheesekun = cheesekun;
 ```
`Array.prototype.slice()`和`Array.prototype.concat()`都会返回一个数组或者对象的浅拷贝
 ```javascript
let cheesekun = ['cheesekun', {age: 19}];
let copyCheesekun = cheesekun.slice(); 
copyCheesekun[1].age = 20;
console.log(cheesekun[1].age); // 20, 引用类型拷贝的是引用，会互相影响
 ```
### 深拷贝（deep copy）
*深拷贝也就是拷贝出一个新的实例，新的实例和之前的实例互不影响*
  
 ```javascript
// 利用JSON序列化实现一个深拷贝
let deepClone = (source) => JSON.parse(JSON.stringify(source));
let cheesekun = {
	arr: [1, 2, 3],
	obj: {
    	age: 19
	},
	func(){
    	return 1;
	}
};
let copyCheesekun = deepClone(cheesekun);
console.log(o2); // => {arr: [1,2,3], obj: {age: 19}}
copyCheesekun.obj.age = 20;
console.log(cheesekun.obj.age);  //19 两个完全不同的实例，不会相互影响
 ```

## 几个好用数组方法
### map
*创建一个新数组，数组中的每个元素调用回调函数*
 > `arr.map(callback,[thisArg])`
 > 回调函数3参数：[当前元素]，[当前索引]，[调用数组]
 > [thisArg] 可选的。执行 callback 函数时 使用的this 值。
 
 ```javascript
let numbers = [1, 5, 10, 15];
numbers.map(x=> x*x);  // [1, 25, 100, 225]
 ```
### filter
*创建一个包含所有通过测试的元素的新数组*
 > `arr.filter(callback,[thisArg])`
 > 回调函数3参数：[当前元素]，[当前索引]，[调用数组]
 > [thisArg] 可选的。执行 callback 函数时 使用的this 值。
 
 ```javascript
[12, 5, 8, 130, 44].filter(x=> x > 10);  // [12, 130, 44]
 ```
### reduce
*一个用来累加的函数*
 > `arr.reduce(callback,[initialValue])`
 > 回调函数3参数：[上一次回调的值/初始值]，[正在处理的值]，[正在处理的值的索引]
 > [initialValue]初始值。如果提供了 initialValue ，索引值从0开始；否则从1开始
 
 ```javascript
[1,2,3,4,5].reduce((prev, next) => prev+next);  //15
[
 {
	"subject": "math",
	"score": 88
	},
 {
	"subject": "chinese",
	"score": 95
 },
 {
	"subject": "english",
	"score": 80
  }
].reduce((prev,next) => prev + next.score, 0);  //263
 ```

## 对象中的function
*对象中，方法内如果还有普通函数，该函数this指向全局，若箭头函数，看上下文*
```javascript
var name = "noCheesekun";
let age = 20;  //let有自己的块级作用域，所以不是window.age
let cheesekun = {
  name: "cheesekun",
  age: 19,
  say() {
    (function() {
     console.log(this.name + " is " + this.age); 
    }())
  }
}
cheesekun.say();  //"noCheesekun is undefined"
```

## 结语
都是一些很基础，但也容易遗忘出错的小玩意。
多留个心眼hhh