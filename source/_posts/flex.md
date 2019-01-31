---
title: flex布局
permalink: ch1003
date: 2017-2-24 15:15:15
categories: 
- 前端
tags: 
- css
- flex
- 布局
---
使用flex布局特别方便，虽然兼容性问题还是需要解决
下面参考了[30分钟学会flex布局](https://zhuanlan.zhihu.com/p/25303493)
简化了很多，帮助记忆。
。
。
实现 flex 布局需要先指定一个容器，任何一个容器都可以被置顶为 flex 布局，
这样容器内部的元素就可以使用 flex 来进行布局。

 ```css
.container {
   display: flex | inline-flex;     //可以有两种取值
}
 ```
分别生成一个块状或行内的 flex 容器盒子。简单说来，如果你使用块元素如 div，你就可以使用 flex，而如果你使用行内元素，你可以使用 inline-flex。
**当设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。**
## 属性介绍
- 对父属性
	- flex-direction
		> 定义主轴方向
		> row
		> row-reverse
		> column
		> column-reverse
	- flex-wrap
		> 定义flex元素单行还是多行显示
		> nowrap
		> wrap
		> wrap-reverse
	- flex-flow
		> flex-direction 和 flex-wrap 缩写
	- justify-content
		> 将flex元素与主轴对齐
		> flex-start
		> flex-end
		> center
		> space-around	（每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍）
		> space-between （两端对齐，项目之间的间隔相等，即剩余空间等分成间隙）
	- align-items
		> 在交叉轴上对齐多个元素
		> stretch （默认值，如果项目未设置高度或者设为 auto，将占满整个容器的高度）
		> flex-start
		> flex-end
		> center
		> baseline （项目的第一行文字的基线对齐 也就是对齐各个flex元素第一行文字的基线）
	- align-content
		> 当交叉轴有多余空间时，对齐容器内的轴线
		> stretch
		> flex-start
		> flex-end
		> center
		> space-between
		> space-around
- 对子属性
	- align-self
		> 在交叉轴上对齐一个元素,覆盖align-items所设的值
		> flex-start
		> flex-end
		> center
		> baseline
		> stretch
	- order
		> 决定flex元素的顺序
		> 0
	- flex-basis
		> 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间
		> **当主轴为水平方向的时候，当设置了 flex-basis**
		> **flex-basis 需要跟 flex-grow 和 flex-shrink 配合使用才能发挥效果。**
	- flex-grow
		> 定义flex元素的放大比例
		> 默认值为 0，即如果存在剩余空间，也不放大
		> 当所有的项目都以 flex-basis 的值进行排列后，仍有剩余空间，那么这时候 flex-grow 就会发挥作用了
		> 如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间。(如果有的话)
		> 如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。
	- flex-shrink
		> 定义了项目的缩小比例
		> 默认值: 1，即如果空间不足，该项目将缩小，负值对该属性无效。
		> 如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。 
		> 如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。
	- flex
		> flex-grow, flex-shrink 和 flex-basis的简写
		
   ```css
   .item{
     	flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
	}
   ```
	> 默认值：0 1 auto， 即不放大，可缩小，大小与 width、height
	> 建议优先使用这个属性，而不是单独写三个分离的属性。

## 小实例
[codepen杂实例](http://codepen.io/cheesekun/pen/EZqKVm)