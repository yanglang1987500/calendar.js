calendar.js
=====
####Perhaps the most simple and easy to use, the most powerful date processing tool 也许是最简单实用的日期处理工具了，用了它保准你再也回不去了。

```javascript
Calendar.getInstance('2015年 02月 04日').format('EEE')
```
输出 "星期三"
```javascript
Calendar.getInstance(new Date()).format('EEE')
```
"星期五"
```javascript
Calendar.getInstance(new Date().getTime()).format('EEE')
```
"星期五"
```javascript
new Date().getTime()
1455846811337
Calendar.getInstance(1455846811337).format('yyyyMMdd HHmmss')
"20160219 095331"
```
```javascript
Calendar.getInstance(1455846811337).format('EE')
```
"周五"
```javascript
Calendar.getInstance(1455846811337).add(Calendar.MONTH,1).format('EE')
```
"周六"
```javascript
Calendar.getInstance(1455846811337).add(Calendar.MONTH,-1).format('EE')
```
"周二"
```javascript
Calendar.getInstance(1455846811337).add(Calendar.WEEK,-1).format('EE')
```
"周五"
```javascript
Calendar.getInstance().add(Calendar.WEEK,-1).format('EE')
```
"周五"
```javascript
Calendar.getInstance().add(Calendar.WEEK,-1).format('yyyy年')
```
"2016年"
