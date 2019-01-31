---
title: java容器---集合
permalink: ch1017
date: 2017-3-24 10:10:10
categories:
- 后台
tags:
- java
- 后台
---
## 前言
学过js的我们知道，js的数组没有固定长度，可以随意删除插入数据。
但是在java里，数组是预先设定好长度的，也就是说，java数组不能直接移除添加数据。
~~随意的js在这一点上还挺方便的~~
因此java创造了一个叫*集合*的容器用来代替数组，它可以随意添加删除数据，并且还可以**指定位置**。

## 集合的类型
- 两大接口:Collection	Map
- Collection子接口
 - List（序列）
  > 排列有序，可以重复
   >> ArrayList（数组序列）
   >> LinkedList（链表）
 - Queue（队列）
  > 排列有序，可以重复
   >> LinkedList（链表）
 - Set（集）
  > 无序，不可重复
  >> HashSet（哈希集）
- Map子接口（以键值对key->value映射）
 > HashMap（哈希表）

![](http://old5ohki5.bkt.clouddn.com/java-container.png)

## 常用方法（以ArrayList，HashMap举例，增删改查）
### ArrayList

（把Course【课程信息】添加到List中）
```java
// <Course>泛型，指定Course类型插入courseToSelect，
// 错误数据插入时，在编译过程就会报错
// 并且无需类型强转
public class ListTest {
	public List<Course> coursesToSelect;
	public ListTest() {
		this.coursesToSelect = new ArrayList<Course>();
	}
}
public class Course {
	public String id;	
	public String name;	
	public Course(String id, String name) {
		this.id = id ;
		this.name = name;
	}
}
```
- 给ArrayList添加数据（add, addAll）
```java
//创建一个课程对象，并通过调用add方法，添加到备选课程List中
Course cr1 = new Course("1" , "数据结构");
coursesToSelect.add(cr1);	//插入cr1

 Course cr2 = new Course("2", "C语言");
 coursesToSelect.add(0, cr2);	//将cr2出入到集合第0位

 //Arrays.asList(course2),把数组转化为Collection对象。。相应的有 Collection.toArray() 方法
 Course[] course = {new Course("3", "离散数学"), new Course("4", "汇编语言")};
 coursesToSelect.addAll(Arrays.asList(course));	//插入数组对象
		
 Course[] course2 = {new Course("5", "高等数学"), new Course("6", "大学英语")};
 coursesToSelect.addAll(2, Arrays.asList(course2));	//在2位置插入数组对象
```
- 删除ArrayList中元素（remove, removeAll）
```java
 coursesToSelect.remove(0);	//删除 0 位置的数据

 Course[] courses = {(Course) coursesToSelect.get(4), (Course) coursesToSelect.get(5)};
 coursesToSelect.removeAll(Arrays.asList(courses));	//删除 4，5 位置的数据
```
- 修改ArrayList中的元素（set）
```java
coursesToSelect.set(4, new Course("7", "毛概"));		//修改4位置的数据
```
- 查找ArrayList中的元素（get）
```java
//所有对象存入集合后，都变成Object类型，取出时需要类型强转（在没有设置泛型的情况下）
Course temp = (Course) coursesToSelect.get(0);	//取出第0位对象
```
- 通过迭代器来遍历ArrayList
 > 迭代器(Iterator)本身是一个接口，所有集合都实现了这个接口方法
 > 迭代器的下标是从 -1 开始的
 
 ```java
public void testIterator() {
	//通过集合的iterator方法，取得迭代器的实例
	Iterator it = coursesToSelect.iterator();
	System.out.println("有如下课程待选(通过迭代器访问)：");
	while(it.hasNext()) {
		Course cr = it.next();
		System.out.println("课程：" + cr.id + ":" + cr.name);
	}
}
 ```

### HashMap
（将Student【id: name】添加到students中）

```java
public class MapTest {
	public Map<String, Student> students;
	public MapTest() {
		this.students = new HashMap<String, Student>();
	}
public class Student {
	public String id;	
	public String name;	
	public Set<Course> courses;
	public Student(String id, String name) {
		this.id = id;
		this.name = name;
		this.courses = new HashSet<Course>();
	}
}
```
-  给HashMap添加数据（put）
```java
Student newStudent = new Student("001", "芝士君");
students.put("0", newStudent);
```
- 删除HashMap中元素（remove）
```java
students.remove("0");	//移除key为"0"的元素
```
- 修改HashMap中的元素（set）
```java
Student newStudent = new Student("002", "不是芝士君");
students.set("0", newStudent);	//将替换key为"0"的数据
```
- 查找HashMap中的元素（get）
```java
Student st = students.get("0");
```
- 获取HashMap所有key的集合并遍历HashMap（keySet）
```java
public void testKeySet() {
	// 通过keySet方法，返回Map中的所有“键”的Set集合
	Set<String> keySet = students.keySet();
	// 取得students的容量
	System.out.println("总共有：" + students.size() + "个学生！");
	// 遍历keySet，取得每一个键，再调用get方法取得每个键对应的value
	for (String stuId : keySet) {
		Student st = students.get(stuId);
		if (st != null)
			System.out.println("学生：" + st.name);
	}
}
```

## 例子下载
> [ArrayList](http://img.mukewang.com/down/5419379b0001d08f00000000.rar)
> [HashMap](http://img.mukewang.com/down/54193863000156ac00000000.rar)

本节总结是从慕课网上看视频整理的: [传送门](http://www.imooc.com/learn/110)

## 结语
其实这玩意查api文档就行了
整理起来也是因为懒得去翻吧hhh

