---
title: 包管理工具 Yarn
permalink: ch1022
date: 2017-4-07 10:10:10
categories:
- 前端
tags:
- 前端
- 工具
- Yarn
---

![](http://oha7s5kdd.bkt.clouddn.com/yarn.png)
## 前言
facebook 新推出的包管理工具，用来代替 npm ，
npm 我都没怎么使用，索性直接 yarn 先

## 命令行集合

```shell
yarn -h 查看yarn的命令集合

> mkdir yarn-project
> cd yarn-project

yarn init  // 初始化项目
yarn install  // 安装package.json内的包

yarn add <package name>  // 安装包
yarn add global <package name>  // 全局安装包
yarn add <package name> --offline  // 离线安装本地包
> yarn add webpack  // 安装一个 webpack 包，`npm install webpack`

yarn remove <package name>  // 移除不需要的包

yarn upgrade <package name>  // 升级包版本
> yarn upgrade webpack  // 升级webpack，`npm update webpack`

yarn cache ls  // 查看本地缓存的所有yarn包
yarn cache dir // 查看本地缓存包的存放路径
yarn cache clean  // 将本地的所有缓存包移除

yarn global ls  // 查看全局安装的包
yarn list  // 查看根目录下安装的包

yarn config list  // 给出 yarn 和 npm 的设置(包括远端地址)
yarn config set  // 修改 config
> yarn config set registry registry.npm.taobao.org  // 将 yarn 访问路径修改为淘宝路径

yarn info  //查看包的信息(远程的包)
> yarn info vue
> 查看 vue 的各种信息

yarn self-update  // 更新 yarn 自己

yarn why <package name>  // 分析为啥项目需要这个包
> yarn why webpack  // 分析 webpack 
```

**yarn run	// 执行 package.json 的scripts**
> yarn run create-dir	// 执行 create-dir 这个命令

```json
// package.json
{
  "name": "yarn-project",
  "version": "1.0.0",
  "main": "index.js",
  "author": "cheesekun",
  "license": "MIT",
  "dependencies": {
    "webpack": "^2.3.3",
    "wide-align": "^1.1.0"
  },
  "scripts": {
  	"create-dir": "mkdir demo",
  	"rm-dir": "rm -rf demo"
  }
}
```

## 结语
前端工具实在是太多了，任重道远
还有最心酸的webpack
啊
。。。

