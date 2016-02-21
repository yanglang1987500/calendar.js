/**
 * @module date.js
 * Calendar日期类以及对Date对象扩展一个format方法
 * 实例化方法getInstance 支持如下链式操作
 * Calendar.getInstance().add(Calendar.MONTH,-1).add(Calendar.DATE,5).format('yyyyMMdd hh:mm:ss')
 * Calendar.getInstance().add(Calendar.WEEK,-1).getTime()
 * Calendar.getInstance().parse('20160120102234')
 * Calendar.getInstance('20160120').format('M月d日')
 * @method Calendar
 * @author yanglang
 * @date 20160120
 */
(function(window){
    window.Calendar = function () {
        throw new TypeError('请使用getInstance方法进行实例化');
    };

    Calendar.prototype = {
        constructor:Calendar,
        /**
         * 构造方法
         * @param date
         */
        init:function(date){
            date ? this.parse(date): this.date = new Date();
        },
        /**
         * @method add
         * @param type Calendar.YEAR Calendar.MONTH Calendar.WEEK Calendar.DATE
         * @param num 正数或负数
         */
        add: function (type, num) {
            if (isNaN(num))
                throw new TypeError('第二个参数必须为数字');
            switch (type) {
                case 1:
                    this.date.setFullYear(num + this.date.getFullYear());
                    break;
                case 2:
                    this.date.setMonth(num + this.date.getMonth());
                    break;
                case 3:
                    this.date.setDate(num + this.date.getDate());
                    break;
                case 4:
                    this.date.setDate(num*7 + this.date.getDate());
                    break;
                case 5:
                    this.date.setHours(num + this.date.getHours());
                    break;
                case 6:
                    this.date.setMinutes(num + this.date.getMinutes());
                    break;
            }
            return this;
        },
        /**
         * 获取Date日期对象值
         * @returns {Date|*|XML|string}
         */
        getTime: function () {
            return this.date;
        },
        /**
         * 将传入对象转换成Calendar实例以便进行日期操作
         * @method parse
         * @param timeObj Date日期对象 或 带时间的字符串（比如2005年05月04日 02时33分44秒）或Calendar对象
         */
        parse: function (timeObj) {
            var type = Object.prototype.toString.call(timeObj);
            if(type === '[object Date]'){
                this.date = timeObj;
            }else if(type === '[object String]'){
                timeObj = timeObj.replace(/[^\d]*/gm,''),len = timeObj.length;
                while(len<14){
                    timeObj+='0';
                    len++;
                }
                timeObj = timeObj.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?$/, '$1/$2/$3 $4:$5:$6');
                this.date = new Date(timeObj);
            }else if(type === '[object Object]' && timeObj instanceof this.constructor){
                this.date = timeObj.getTime();
            }else if(type === '[object Number]' ){
                this.date = new Date(timeObj);
            }else{
                throw new TypeError('暂不支持转换此数据类型');
            }
            return this;
        },
        /**
         * 得到格式化的日期字符串
         * @param fmt 格式化模板如 yyyyMMdd hh:mm:ss
         * @returns {String}
         */
        format:function(fmt){
            return this.date.format(fmt);
        }
    };

    Calendar.prototype.init.prototype = Calendar.prototype;

    /**
     * 获取Calendar实例
     * @param date optional 可选参数 可以传入一个日期对象或日期字符串或Calendar对象或时间数
     * @returns {Calendar.prototype.init}
     */
    Calendar.getInstance = function (date) {
        return new Calendar.prototype.init(date);
    };

    Calendar.YEAR = 1;
    Calendar.MONTH = 2;
    Calendar.DATE = 3;
    Calendar.WEEK = 4;
    Calendar.HOUR = 5;
    Calendar.MINUTE = 6;

    /**
     * 对Date的扩展，将 Date 转化为指定格式的String<br>
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，<br>
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)<br>
     * 例子：<br>
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423<br>
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18<br>
     * (new Date()).format("yyyy-MM-dd EE");  ==> 2015-08-07 周五<br>
     * (new Date()).format("yyyy-MM-dd EEE");  ==> 2015-08-07 星期五<br>
     * (new Date()).format("yyyy-MM-dd E");  ==> 2015-08-07 五<br>
     * @method format
     * @param {String} fmt format字符串
     * @returns {String}
     */
    Date.prototype.format = function(fmt) {
        var that = this;
        var o = {
            "M+" : this.getMonth() + 1, //月份
            "d+" : this.getDate(), //日
            "h+" : this.getHours() % 12 == 0 ? 12: this.getHours() % 12, //小时
            "H+" : this.getHours(), //小时
            "m+" : this.getMinutes(), //分
            "s+" : this.getSeconds(), //秒
            "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
            "S" : this.getMilliseconds()//毫秒
        };
        var week = {
            "0" : "星期天","1" : "一","2" : "二","3" : "三","4" : "四","5" : "五","6" : "六"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1,function(){
                if(that.getDay() == 0){
                    if(RegExp.$1.length > 1){
                        return RegExp.$1.length > 2?"星期天":"周日";
                    }else
                        return "日";
                }else{
                    if(RegExp.$1.length > 1){
                        return RegExp.$1.length > 2?"星期"+ week[that.getDay()]:"周"+ week[that.getDay()];
                    } else{
                        return week[that.getDay()]
                    }
                }
            }());
        }
        for ( var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]): (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };
})(window);
