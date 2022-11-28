export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 LOL', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () { }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
// 判断对象数组中是否有某一项值为a的数据 有则返回true 没有返回false

/**
 * 判断对象数组中是否有某一项值为a的数据 有则返回true 没有返回false
 * @param {*} arr
 * @param {*} key
 * @param {*} valuetosearch
 * @returns
 */
export function findIndexByKeyValue (arr, key, valuetosearch) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === valuetosearch) {
      return i
    }
  }
  return -1
}
export function arrRemoveItem (arr, item) {
  return arr.filter(function check (value) {
    return value !== item
  })
}
export function arrAddItem (arr, item) {
  return arr.concat(item)
}
/**
 *
 * @param {全屏的dom} element
 */
export function launchIntoFullscreen (element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}
/**
 * 退出全屏
 */
export function exitFullscreen () {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}
// 经纬度转墨卡托
export function _getMercator (lng, lat) { // [114.32894, 30.585748]
  const p = {}
  const earthRad = 6378137.0
  p.lng = lng * Math.PI / 180 * earthRad
  const a = lat * Math.PI / 180
  p.lat = earthRad / 2 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)))
  return p // [12727039.383734727, 3579066.6894065146]
}

// 墨卡托转经纬度
export function _getLngLat (x, y) {
  const p = {}
  p.lng = x / 20037508.34 * 180
  const mmy = y / 20037508.34 * 180
  p.lat = 180 / Math.PI * (2 * Math.atan(Math.exp(mmy * Math.PI / 180)) - Math.PI / 2)
  return p
}
// 获取当前年月日时分秒
export function getDate () {
  const nowDate = new Date()
  const date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
    hours: nowDate.getHours(),
    minutes: nowDate.getMinutes(),
    seconds: nowDate.getSeconds()
  }

  const newmonth = date.month > 10 ? date.month : '0' + date.month
  const newday = date.date > 10 ? date.date : '0' + date.date
  const newminutes = date.minutes > 10 ? date.minutes : '0' + date.minutes
  const newseconds = date.seconds > 10 ? date.seconds : '0' + date.seconds
  const seperator1 = '-'
  const seperator2 = ':'
  const dateTime = date.year + seperator1 + newmonth + seperator1 + newday + ' ' + date.hours + seperator2 + newminutes + seperator2 + newseconds
  return dateTime
}
// 获取当前的前一周的时间
export function getprvweek (nowdate) {
  const date = new Date(new Date(nowdate).getTime() - 6 * 24 * 3600 * 1000)
  const seperator1 = '-'
  const seperator2 = ':'
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const strDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
  return currentdate
}
