
// 将对象转换成url后可带的参数字符串
function objecToQueryString(obj) {
  const keyArr = Object.keys(obj);
  let str = '?';
  keyArr.forEach((item) => {
    if(obj[item] != null) {
      str += `${item}=${obj[item]}&`
    }
  })
  return str
}

/* 深拷贝 */
function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}



function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

// 防抖动debounce
function _debounce (fn, delay) {
  delay = delay || 600
  let timer
  return function () {
    let ctx = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(ctx, args)
    }, delay)
  }
}

import axios from 'axios';
function exportExcel(url, options = {}) {
    return new Promise((resolve, reject) => {
        console.log(`${url} 请求数据，参数=>`, JSON.stringify(options))
        axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
        axios({
            method: 'post',
            url: url, // 请求地址
            data: options, // 参数
            responseType: 'blob' // 表明返回服务器返回的数据类型
        }).then(
            response => {
                resolve(response.data)
                let blob = new Blob([response.data], {
                    type: 'application/vnd.ms-excel'
                })
                console.log(blob, response)
                let fileName = response.headers['content-disposition'] ? response.headers['content-disposition'] : Date.parse(new Date()) + '.xlsx'
                if (window.navigator.msSaveOrOpenBlob) {
                    // console.log(2)
                    navigator.msSaveBlob(blob, fileName)
                } else {
                    // console.log(3)
                    var link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = fileName
                    link.click()
                    //释放内存
                    window.URL.revokeObjectURL(link.href)
                }
            },
            err => {
                reject(err)
            }
        )
    })
}


let utils = {
  objecToQueryString,
  deepClone,
  getQueryObject,
  _debounce,
  exportExcel
}

export default utils;