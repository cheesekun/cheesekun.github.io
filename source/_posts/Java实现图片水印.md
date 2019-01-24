---
title: Java实现图片水印
permalink: cheesekun.top/ch1011
date: 2017-3-14 10:10:10
categories:
- 后台
tags:
- java
- 水印 
---

## 前言
这个星期一一言不合轮到我们小组做java的小知识点介绍，要录个几分钟的视频，
啊。。。一直没看java，一言不合就要录视频尼玛。
刚好之前想用前端弄个网页p图，
所以这次视频就讲下怎么用简单地用java给图片添加水印吧。。。。。

## 思路
1. 先new个File对象来获取图片
2. 使用ImageIO对象的read方法读取图片数据
3. 再创建一个BufferedImage对象来，用来放置图片，我把它当作一个相框来看
4. 调用createGraphics方法，会返回一个Graphics2D对象，可用于图像操作，也就是对相框进行图像操作(该对象有很多对图像进行操作的方法，如放大缩小旋转)
5. 使用该对象的drawImage()方法将图片放置于其中
6. 到这一部我们就把图片放在相框中了，后面添加上水印也就是把水印图片添加到相框的相对位置上而已，不过多了一步将水印图片进行半透明化
7. 然后以相同的方法放透明化水印图片到相框
8. 添加后我们要用dispose释放内存
9. 最后write方法输出已经打上水印的图片到指定路径
> 读图片->建容器->放图片->放水印->释放内存->写出图片

## 代码
```java
package mark;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;

public class AddMark {  
   
    public final static void pressImage(String backImg, String markImg,  
            String destImageFile, int x ,int y , float alpha) {  
        try {  
            File img = new File(backImg);  
            Image src = ImageIO.read(img);  
            int width = src.getWidth(null);  //接口对象参数，没有就写null
            int height = src.getHeight(null);
            
            //TYPE_INT_RGB常量是把底图设置为没有透明通道的图片，也就是说如果图片是半透明图片的话，会被透明部分会被填充
            BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);  
            
            Graphics2D g = image.createGraphics();  //再创建一个Graphics2D对象，可以对图片图形或者颜色之类进行操作，相当于有一支画笔
            
            //将原图放进相框中,0,0表示图片偏移相框x轴0px，y轴0px,也就是说原图相对相框位置不改变
            //null用于在构造 Image 时，接收有关 Image 信息通知的异步更新接口，没有就写null
            g.drawImage(src, 0, 0, width, height, null);    
           
            // 水印添加
            Image src_mark = ImageIO.read(new File(markImg));
            g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_ATOP, alpha));    //设置透明度
            g.drawImage(src_mark, x,y, null);  //水印的位置 相对相框定位
            
            // 水印添加结束 ,释放此图形的上下文以及它使用的所有系统资源。调用 dispose 之后，就不能再使用 Graphics 对象。
            g.dispose();  
            ImageIO.write((BufferedImage) image, "png", new File(destImageFile));    //将缓存的图片对象写入到指定位置
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }  
    
    public static void main(String[] args) {  
    	//以相框左上角为原点，距离x轴200px; y轴800px; 透明度0.5
        AddMark.pressImage("F:/imageTest/ac.png", "F:/imageTest/acLogo.png", "F:/imageTest/ac111.png", 200, 800, 0.5f);
    }     
  
}  
  

```
## 效果
原图&水印
> 这下面是两张图，背景色一样gg (ノ*゜▽゜*)

![](http://oksbjk6b9.bkt.clouddn.com/ac.png)![](http://oksbjk6b9.bkt.clouddn.com/acLogo.png)
水印图
![](http://oksbjk6b9.bkt.clouddn.com/ac111.png)

>`Graphics2D` 也就是之前说的画笔，这个类有很多方法，如图片旋转，放大缩小，文字水印都有，查下api就可以用啦

## 结语
果然对java没什么好感呀。大概是因为自己太蠢了

> JAVAなんで、大嫌い
