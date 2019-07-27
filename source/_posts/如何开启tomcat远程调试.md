---
layout: post
title: 如何开启tomcat远程debug
tags: [tomcat]
comments: true
date: 2019-07-27 14:54:02
categories: 开发
---

![](/assets/blogImg/2019.07.27/debug.jpg)

> 在工作的过程中，经常会遇到项目发包到远程的服务器上去了，会有些莫名其妙的环境BUG和数据BUG，为了更好，更方便的开发和解决BUG，有时候我们需要开启远程调试

<!-- more -->

对于tomcat的来说，开启远程调试其实非常简单！只需要开启jpda服务即可！有两种方式，各有各的优缺点。

JPDA 是 Java 平台调试体系结构的缩写，通过 JPDA 提供的 API，开发人员可以方便灵活的搭建 Java 调试应用程序。JPDA 主要由三个部分组成：Java 虚拟机工具接口（JVMTI），Java 调试线协议（JDWP），以及 Java 调试接口（JDI）。想要深入了解JPDA可以查看developerWorks上的系列文章——[深入Java调试体系](http://www.ibm.com/developerworks/cn/views/java/libraryview.jsp?search_by=深入+Java+调试体系)，这里我们只需要怎么用就行了。

## 方式一：

linux系统下，我们可以在tomcat/bin目下的catalina.sh中进行配置：

> JPDA_TRANSPORT=dt_socket 
> JPDA_ADDRESS=5005
> JPAD_SUSPEN

+ JPDA_TRANSPORT：即调试器和虚拟机之间数据的传输方式，默认值是dt_socket
+ JPDA_SUSPEND：即JVM启动后是否立即挂起，默认是n

或者通过JPDA_OPTS进行配置：

> JPDA_OPTS=*'-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005’*

通过这种方式配置之后需要用如下方式启动tomcat才能启动jpda：

> ./catalina.sh jpda start

优点是在其他人员./shutdown.sh 能正常的结束掉java进程。缺点是别人重启的时候可能并不会按照上面的方式启动tomcat而是直接./start.sh，这样远程调试并没有开启。

## 方式二：

同样是通过JAVA_OPTS指定相应的JPDA参数：

> JAVA_OPTS="$JAVA_OPTS -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005”

这种方式开启的调试正常启动的时候没什么问题，而且能正常调试，但是在停止tomcat的时候会出现ERROR，无法正常终止java进程，需要手动kill掉进程！

比较推荐的还是方法一

PS：网上看到一个说如果用方法一开启的调试，如果用startup.sh启动可以在修改了catalina.sh的基础上，多修改最底下的一行。

> 原来是：exec &quot;$PRGDIR&quot;/&quot;$EXECUTABLE&quot; start &quot;$@&quot;
> 改完是：exec &quot;$PRGDIR&quot;/&quot;$EXECUTABLE&quot; jpda start &quot;$@&quot;

