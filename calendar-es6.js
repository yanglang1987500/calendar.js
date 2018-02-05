const Calendar = () => {
  throw new TypeError('请使用getInstance方法进行实例化');
};

export default Calendar;

if (typeof window === 'undefined') {
  if (typeof module !== 'undefined') {
    module.exports = Calendar;
  }
} else {
  window.Calendar = Calendar;
}

Calendar.YEAR = 1;
Calendar.MONTH = 2;
Calendar.DATE = 3;
Calendar.WEEK = 4;
Calendar.HOUR = 5;
Calendar.MINUTE = 6;
Calendar.SECOND = 7;

const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;

Calendar.prototype = {
  constructor: Calendar,
  init: (date) => {
    if (date) {
      this.parse(date);
    } else {
      this.date = new Date();
    }
  },
  add: (type, num) => {
    if (isNaN(num)) {
      throw new TypeError('第二个参数必须为数字');
    }
    switch (type) {
      case Calendar.YEAR:
        this.date.setFullYear(num + this.date.getFullYear());
        break;
      case Calendar.MONTH:
        this.date.setMonth(num + this.date.getMonth());
        break;
      case Calendar.DATE:
        this.date.setDate(num + this.date.getDate());
        break;
      case Calendar.WEEK:
        this.date.setDate((num * 7) + this.date.getDate());
        break;
      case Calendar.HOUR:
        this.date.setHours(num + this.date.getHours());
        break;
      case Calendar.MINUTE:
        this.date.setMinutes(num + this.date.getMinutes());
        break;
      case Calendar.SECOND:
        this.date.setSeconds(num + this.date.getSeconds());
        break;
      default:
        throw new TypeError('必须指定Type');
    }
    return this;
  },
  getTime: () => this.date,
  parse: (time) => {
    let timeObj = time;
    const type = Object.prototype.toString.call(timeObj);
    if (type === '[object Date]') {
      this.date = timeObj;
    } else if (type === '[object String]') {
      timeObj = timeObj.replace(/[^\d]*/gm, '');
      let len = timeObj.length;
      while (len < 14) {
        timeObj += '0';
        len += 1;
      }
      timeObj = timeObj.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?.*$/, '$1/$2/$3 $4:$5:$6');
      this.date = new Date(timeObj);
    } else if (type === '[object Object]' && timeObj instanceof this.constructor) {
      this.date = timeObj.getTime();
    } else if (type === '[object Number]') {
      this.date = new Date(timeObj);
    } else {
      throw new TypeError('暂不支持转换此数据类型');
    }
    return this;
  },
  format: fmt => this.date.format(fmt),
  friendly: (seconds) => {
    const now = new Date().getTime();
    const before = seconds ? (seconds * 1000) : this.getTime().getTime();
    const diffValue = now - before;
    if (diffValue < 0) {
      throw Error('计算时间不能大于当前时间');
    }
    const monthC = diffValue / month;
    const weekC = diffValue / (7 * day);
    const dayC = diffValue / day;
    const hourC = diffValue / hour;
    const minC = diffValue / minute;
    if (monthC >= 1) {
      return `${parseInt(monthC, 10)}个月前`;
    } else if (weekC >= 1) {
      return `${parseInt(weekC, 10)}周前`;
    } else if (dayC >= 1) {
      return `${parseInt(dayC, 10)}天前`;
    } else if (hourC >= 1) {
      return `${parseInt(hourC, 10)}小时前`;
    } else if (minC >= 1) {
      return `${parseInt(minC, 10)}分钟前`;
    }
    return '刚刚';
  },
};

Calendar.prototype.init.prototype = Calendar.prototype;

Calendar.getInstance = date => new Calendar.prototype.init(date);

Calendar.getServerTime = () => {
  let xmlHttp = false;
  try {
    xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e) {
    try {
      xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e2) {
      xmlHttp = false;
    }
  }

  if (!xmlHttp && typeof XMLHttpRequest !== 'undefined') {
    xmlHttp = new XMLHttpRequest();
  }

  xmlHttp.open('GET', 'null', false);
  xmlHttp.setRequestHeader('Range', 'bytes=-1');
  xmlHttp.send(null);
  return new Date(xmlHttp.getResponseHeader('Date'));
};

Date.prototype.format = (tmpFmt) => {
  let fmt = tmpFmt;
  const that = this;
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 小时
    'H+': this.getHours(), // 小时
    'U+': this.getUTCHours(), // UTC小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds(), // 毫秒
  };
  const week = {
    '0': '星期天',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`)
        .substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (() => {
      if (that.getDay() === 0) {
        if (RegExp.$1.length > 1) {
          return RegExp.$1.length > 2 ? '星期天' : '周日';
        }
        return '日';
      } else {
        if (RegExp.$1.length > 1) {
          return RegExp.$1.length > 2 ? `星期${week[that.getDay()]}` : `周${week[that.getDay()]}`;
        }
        return week[that.getDay()];
      }
    })());
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return fmt;
};
