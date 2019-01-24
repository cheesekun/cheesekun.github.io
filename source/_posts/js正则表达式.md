---
title:  一波正则表达式
permalink: cheesekun.top/ch1008
date: 2017-3-11 10:10:10
categories:
- 前端
tags:
- 正则表达式
- javascript 
---
## 前言
基本上是个语言就会有正则表达式吧。虽然只是单单一个语法知识，内容杂到都有专门讲它的书了。
虽然正则看起来很复杂，但是对于前端来说，必学吧。
毕竟表单处理还是需要用到的，不会写也要看懂。
下面就总结了下js正则表达式的用法
例子都是用**cheesekun**
> では。始めましょう
> 那么，开始吧

## 创建正则表达式
首先，创建正则表达式有两种方法，一种是正则表达式字面量，一种是使用RegExp对象的构造函数
- 字面量
 ```javascript
  const regex = /chee+kun/;
  const regex = /chee+kun/g;
 ```
 > 通常使用这种，性能较好
- 使用RexExp对象`new RegExp(patten, flags)`
 ```javascript
 let regex = new RegExp("chee+sekun")
 let regex = new RegExp("chee+sekun", "g")
 ```
 > 这种用法主要用在无法事先确定模式，只能在运行的时候以字符串形式创建，性能较低

## 编写正则表达式模式
- 不使用特殊符号
 > /kun/ 即可匹配到"hi，cheesekun，what's ur name" 和 "what words include 'kun'"
- 使用特殊符号
 > 举个小例子
 > `/chee+sekun/` 可匹配到"cheesekun"，"cheeeeesekun"但不可以匹配"chesekun"
 	>> 其中的+，匹配前面一个表达式（也就是前面的"e"）1次或者多次。等价于 {1,}
 
## 常用特殊符号
-  \
 > 转义字符。如/chee\+sekun/ 将 + 转义，只能匹配 "cheese+kun"
 > 放在非特殊字符前，则表示下一个字符是特殊的，如\b，是一个字符边界，下面会说
- ^
 > 匹配输入的开始
 > 如`/^cheesekun/`可匹配"cheesekun hi"，但不能匹配"hi cheesekun"
- $
 > 匹配输入的结束
 > 如`/cheesekun$/`可匹配"hi cheesekun"，但不能匹配"cheesekun hi"
- *
 > 匹配前一个表达式0次或多次。等价于 {0,}
 > 如`/chee*sekun/`可匹配"chesekun",也可以匹配"cheeeeeeeesekun"
- +
 > 匹配前一个表达式1次或多次。等价于 {1,}
 > 如`/chee+sekun/`可匹配"cheesekun",也可以匹配"cheeeeeeeesekun"
- ?
 > 匹配前一个表达式0次或者1次。等价于 {0,1}
 > 如`/chee?sekun/`可匹配"chesekun",也可以匹配"cheesekun"
- .
 > 匹配除换行符之外的任何单个字符
 > 如`/che.sekun/`可匹配"cheesekun",也可以匹配"che♂sekun"
- (x)
 > 匹配 'x' 并且记住匹配项
 > 在正则表达式的匹配环节，要使用 \1, \2, \n 这样的语法
 > 如`/(cheesekun)(kun)\1\2/` 等价于 `/cheesekuncheesekun/`
 > 在正则表达式的<a href="#1">替换环节</a>，则要使用像 $1、$2、$n 这样的语法
 > 如`"cheesekun".replace(/(cheese)(kun)/,'$2$1')`,会返回 "kuncheese"
- (?:x)
 > 匹配 'x' 但是不记住匹配项
 > `/cheese{1,2}kun/ {1,2}`只能对 e 起作用
 > `/(?:cheese){1,2}kun/` {1,2}则对cheesekun 起作用，可匹配 "cheesecheesekun"，而不记录匹配项，则不能使用 \1或者 $1
 > 如`"cheesekun".replace(/(cheese)(kun)/,'$2$1')`,会返回 "$2kun"

- x(?=y)
 > 匹配'x'仅仅当'x'后面跟着'y'
 > 如`/cheese(？=kun)/` 会匹配"cheesekun",也匹配"cheesekun123"
 > 但只会返回匹配的"cheese"
 
 ```javascript
 /cheese(?=kun)/.exec("cheesekun123");  //["cheese"]
 /cheese(kun)/.exec("cheesekun123");  //["cheesekun", "kun"]
 ```
- x(?!y)
 > 匹配'x'仅仅当'x'后面不跟着'y'
 > 如`/cheese(？!kun)/` 会匹配"cheese123",但不能匹配"cheesekun"
- x|y
 > 匹配'x'或者'y'
 > 如/cheese|kun/ 会匹配"cheese hi",也可以匹配"kun hi"
- {n},{n,m}
 > 1.表示匹配前一个表达式n次
 > 2.表示匹配前一个表达式n到m次
 > 如`/chee{3}sekun/`,匹配"cheeeesekun"或者"cheeeesekun123"
 > `/chee{3,5}sekun/`,匹配"cheeeesekun"或者"cheeeeeesekun123"
- [xyz]
 > 一个字符集合。匹配方括号的中任意字符，包括转义序列
 > 如`/cheese[kun]/`,可匹配"cheesek","cheeseku","cheesen"
 > 可以使用破折号 - 来指定一个字符范围
 > 如`/cheese[a-j]/`,可匹配"cheesec","cheeseg",不可以匹配"cheese1"
- [^xyz]
 > 一个反向字符集。匹配任何没有包含在方括号中的字符
 > 如`/cheese[^kun]/`,可匹配"cheesea","cheeseab","cheesecd"
- \b
 > 匹配一个词的边界,可认为是 ^ 和 $ 的集合
 > 如`/cheese\b/` 可匹配"kuncheese"
 > `/\bcheese/` 可匹配"cheesekun"
- \d 匹配一个数字，等价于[0-9]
- \D 匹配一个非数字，等价于[^0-9]
- \w 匹配一个单字字符（字母、数字或者下划线）,等价于[A-Za-z0-9_]
- \W 匹配一个非单字字符（字母、数字或者下划线）,等价于[^A-Za-z0-9_]
- \s 匹配一个空白字符，包括空格、制表符、换页符和换行符
- \S 匹配一个空白字符，包括空格、制表符、换页符和换行符
- \f 匹配一个换页符 (U+000C)
- \n 匹配一个换行符 (U+000A)
- \r 匹配一个回车符 (U+000D)

## 正则表达式方法
- RegExp 方法
 - test 
  > 在字符串中测试是否匹配的RegExp方法，它返回true或false 

   ```javascript
   /che+sekun/.test("cheeeeesekun"); // true
   ```
 - exec
  > 在字符串中执行查找匹配的RegExp方法，它返回一个数组（未匹配到则返回null）
  > 如果模式使用了匹配项，则匹配项也会一同传入数组
  
   ```javascript
   /che+sekun/.exec("cheeeesekun123");  // ["cheeeesekun"]
   /ch(e+se)(kun)/.exec("cheeeesekun123");  // ["cheeeesekun","eeeese","kun"]
   ```
- String 方法
 - replace
  > 在字符串中执行查找匹配的String方法，并且使用替换字符串替换掉匹配到的子字符串
  
   ```javascript
   "cheesekun hi".replace(/hi/,"hello");  // "cheesekun hello"
   "cheesekun".replace(/(cheese)(kun)/,'$2$1'); // "kuncheese"
   ```
 - search
  > 在字符串中测试匹配，它返回匹配到的位置索引，或者在失败时返回-1
  
   ```javascript
   "cheesekun".search(/eese/)  // 2
   ```
 - match
  > 在字符串中执行查找匹配，它返回一个数组或者在未匹配到时返回null
  
   ```javascript
   "cheeeeeseeekun".match(/ee*/)  // ["eeeee"]
   ```
 - split
   > 使用正则表达式或者一个固定字符串分隔一个字符串，并将分隔后的子字符串存储到数组中
  
   ```javascript
   "cheesekun".split(/e/)  // ["ch", "", "s", "kun"]
   "cheesekun".split(/ee/)  // ["ch", "sekun"]
   ```

## 正则表达式标志
 - g 全局搜索。也就是找到所有匹配
   ```javascript
   "cheeeeeseeekun".match(/ee*/)  // ["eeeee"]
   "cheeeeeseeekun".match(/ee*/g)  // ["eeeee","eee"]
   ```
 - i 不区分大小写搜索。
  ```javascript
  "chEEseeekun".match(/ee*/)  // ["eee"]
  "chEEseeekun".match(/ee*/i)  // ["EE"]
  ```
 - m 多行搜索。将\n,\r当作换行
  ```javascript
  var str = "cheese kun\n hi\r do you\f love\t me";
  var patt = /(\w+)$/gm
  str.match(patt);    // ["kun", "hi", "me"]
  var str2 = "cheese kun\n hi\rdo you\nlove\t me";
  var patt2 = /^(\w+)/gm
  str2.match(patt2);  // ["cheese", "do", "love"]
  ```

## 常用正则表达式
```javascript
用户名	/^[a-z0-9_-]{6,16}$/
密码		/^[a-z0-9_-]{6,18}$/
电子邮箱	/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
手机号   /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
```

## 结语
上面内容以[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-non-word)为参考
加入了自己写的例子和一些实践后的解释
都test过，就当作一份js正则表达式文档给自己或他人参考吧

> 大胆になれ。一番になれ。　独自になれ
> 大胆一点。成为第一。独立一点。
