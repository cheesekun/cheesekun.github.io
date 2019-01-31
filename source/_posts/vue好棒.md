---
title: vue好棒
permalink: ch1023
date: 2017-4-16 10:10:10
categories:
- 前端
tags:
- javascript
- 前端
- vue
---
## 前言
前些天ES6看得差不多了，就想着捡起以前学了一点点的`vue`。
不学不要紧。连带得把`yarn`,`webpack`给学了。
`yarn`的话是一个比`npm`强大的包管理工具，很简单使用
`webpack`是一个前端资源模块化管理和打包工具，十分强大，但配置起来很要命

## vue成绩录入小例子
学什么都要弄点小玩意练练手，所以用vue写了个`java`实训的成绩录入
示例: [demo](http://cheesekun.top/score-enter)
源码: [github](https://github.com/cheeseKun/vue-list)

### 铲掉重写
`vue`有一个特别棒的功能就是组件(conpenent)，能把页面上的各部分进行拆分，
再利用ES6的`import`，`export`导入导出。
一开始觉得特别棒，所以边看文档边弄实例。
结果gg了，因为如果拆分的组件涉及到复杂的数据传输，就会特别麻烦。
不过也由于这个失误，知道了怎么进行父子组件的传参。

### 简单父子传参
- 父向子组件传参
 ```javascript
父：<componentA msgFromFather="from father"></componentA>  //如果msgFromFather是动态的，可以:msgFromFather.
子：<button @cllick="consoleInfo"></button>
props: ["msgFromFather"],  //先声明调用父组件的变量
methods: {
	consoleInfo() {
		console.log(this.msgFromFather);
	}
}
 ```
- 子向父组件传参
 > 使用 $on(eventName) 监听事件
 > 使用 $emit(eventName) 触发事件

 ```javascript
父：<course v-on:child="showScore"></course>
子：setCBgColor(x) {
      this.nowSelected = x;
      this.$emit('child', this.nowSelected.scores); // 第一个参数为父组件函数绑定的自定义事件，剩余参数为传参
    }
 ```

### vue脚手架
> `vue-cli`, vue 提供的一个脚手架工具

里面已经配置好webpack，可以直接利用它来写一个`单页spa`
```shell
yarn add global vue-cli   // 全局安装vue脚手架
vue init webpack vue-todolist  // 创建一个webpack模板的新项目
cd vue-todolist
yarn install  安装所需依赖
yarn run dev  监听8080端口index.html
```

## 结语
神奇的 MVVM 框架，对那些之前很懵懂的前端模块化，组件化，工程化
有了一个大概的认识，😝
> 素晴らしい
