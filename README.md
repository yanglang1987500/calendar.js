# calendar.js
Perhaps the most simple and easy to use, the most powerful date processing tool 也许是最简单易用，功能最强的日期处理工具
Calendar.getInstance('2015年 02月 04日').format('EEE')

"星期三"

Calendar.getInstance(new Date()).format('EEE')

"星期五"

Calendar.getInstance(new Date().getTime()).format('EEE')

"星期五"

new Date().getTime()

1455846811337

Calendar.getInstance(1455846811337).format('yyyyMMdd HHmmss')

"20160219 095331"

Calendar.getInstance(1455846811337).format('EE')

"周五"

Calendar.getInstance(1455846811337).add(Calendar.MONTH,1).format('EE')

"周六"

Calendar.getInstance(1455846811337).add(Calendar.MONTH,-1).format('EE')

"周二"

Calendar.getInstance(1455846811337).add(Calendar.WEEK,-1).format('EE')

"周五"

Calendar.getInstance().add(Calendar.WEEK,-1).format('EE')

"周五"

Calendar.getInstance().add(Calendar.WEEK,-1).format('yyyy年')

"2016年"
