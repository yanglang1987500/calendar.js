calendar.js
=====
####Perhaps the most simple and easy to use, the most powerful date processing tool 也许是最简单实用的日期处理工具了，用了它保准你再也回不去了。

API非常简洁，只有getInstance、add、format、parse、getTime五个方法
 * getInstance用以实例化，入参可以是一个日期对象或日期字符串或Calendar对象或时间值
 * add方法用来操作时间，有两个参数，第一个参数是Canlendar下的常量：
```javascript
     Calendar.YEAR = 1;
     Calendar.MONTH = 2;
     Calendar.DATE = 3;
     Calendar.WEEK = 4;
     Calendar.HOUR = 5;
     Calendar.MINUTE = 6;
```
代表想要操作的类型，第二个参数是整数，可正可负，正则加，负则减。
* format方法负责格式化输出时间
* parse方法负责转换字符串，任何格式的时间都能转换，如'2015年 12 月 03日 12时'
* getTime方法获取Date对象

使用示例
-----------
```javascript
Calendar.getInstance('2015年 02月 04日').format('EEE')
```
输出 "星期三"
```javascript
Calendar.getInstance(new Date()).format('EEE')
```
输出 "星期五"
```javascript
Calendar.getInstance(new Date().getTime()).format('EEE')
```
输出 "星期五"
```javascript
new Date().getTime()
1455846811337
Calendar.getInstance(1455846811337).format('yyyyMMdd HHmmss')
```
输出 "20160219 095331"
```javascript
Calendar.getInstance(1455846811337).format('EE')
```
输出 "周五"
```javascript
Calendar.getInstance(1455846811337).add(Calendar.MONTH,1).format('EE')
```
输出 "周六"
```javascript
Calendar.getInstance(1455846811337).add(Calendar.MONTH,-1).format('EE')
```
输出 "周二"
```javascript
Calendar.getInstance(1455846811337).add(Calendar.WEEK,-1).format('EE')
```
输出 "周五"
```javascript
Calendar.getInstance().add(Calendar.WEEK,-1).format('EE')
```
输出 "周五"
```javascript
Calendar.getInstance().add(Calendar.WEEK,-1).format('yyyy年')
```
输出 "2016年"
